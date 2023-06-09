import grpc
import palette_ai_pb2
import palette_ai_pb2_grpc
from concurrent import futures
import logging
import torch
import torchaudio
from transformers import pipeline
from pydub import AudioSegment
import os
from datetime import datetime, timezone, timedelta

# 모델 로드
# whisper 모델
whisperPipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-medium",
    chunk_length_s=30,
    device="cpu",
)
# RoBERTa fine-tuned 모델
bertClassifier = pipeline(
    "text-classification",
    model="nlp04/korean_sentiment_analysis_dataset3",
    device="cpu",
    top_k=None,
)

ko2en = {
    "중립": "neutral",
    "행복": "happy",
    "당황": "surprise",
    "분노": "anger",
    "불안": "anxiety",
    "슬픔": "sadness",
    "혐오": "disgust",
}


def kortime():
    kst = timezone(timedelta(hours=9))
    return datetime.now(kst).strftime("%Y-%m-%d %H:%M:%S ")


# 메인 로직
class PaletteAI(palette_ai_pb2_grpc.PaletteAIServicer):
    def __init__(self):
        pass

    def SpeechToText(self, request, context):
        audio_data = request.audio
        webm_file = datetime.now().strftime("%Y%m%d%H%M%S") + ".webm"
        wav_file = datetime.now().strftime("%Y%m%d%H%M%S") + ".wav"
        with open(webm_file, 'wb') as f:
            f.write(audio_data)
        sound = AudioSegment.from_file(webm_file, format="webm")
        sound.export(wav_file, format="wav", parameters=['-ar', '16000'])
        audio_input, _ = torchaudio.load(wav_file)
        logger.info(kortime() + "Audio file loaded")
        input_values = torch.mean(audio_input, dim=0).numpy()
        logger.info(kortime() + "Prediction started...")
        prediction = whisperPipe(
            input_values,
            generate_kwargs={
                "task": "transcribe",
                "language": "korean",
                "max_new_tokens": 65535
             }
        )['text']
        logger.info(kortime() + "Prediction: " + prediction)
        if os.path.exists(webm_file):
            os.remove(webm_file)
        if os.path.exists(wav_file):
            os.remove(wav_file)
        return palette_ai_pb2.TextResponse(prediction=prediction)

    def TextToEmotion(self, request, context):
        result = bertClassifier(request.text)[0]
        data = {
            ko2en[r["label"]]: r["score"] for r in result
        }
        logger.info(kortime() + "Prediction: " + str(data))
        ret = palette_ai_pb2.EmotionResponse(
            neutral=data.get("neutral", 0),
            happy=data.get("happy", 0),
            surprise=data.get("surprise", 0),
            anger=data.get("anger", 0),
            anxiety=data.get("anxiety", 0),
            sadness=data.get("sadness", 0),
            disgust=data.get("disgust", 0),
        )
        return ret


# 서버 실행
def serve():
    # 병렬 처리
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=None))
    palette_ai_pb2_grpc.add_PaletteAIServicer_to_server(PaletteAI(), server)
    # 포트 번호
    port = '50051'
    server.add_insecure_port('[::]:' + port)
    server.start()
    logger.info(kortime() + "Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == '__main__':
    # 로그 설정
    logger = logging.getLogger('grpc')
    logger.setLevel(logging.DEBUG)
    stream_handler = logging.StreamHandler()
    logger.addHandler(stream_handler)
    serve()
