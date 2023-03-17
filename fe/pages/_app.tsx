// import "@/styles/globals.css";
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      // 초기화 되어있지 않을 경우(중복 초기화 에러 방지)
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SDK_KEY); // env 환경변수 사용
      console.log(window.Kakao.isInitialized()); // 초기화 여부 확인(true 나와야 함)
    }
  }, []);
  return <Component {...pageProps} />;
}
