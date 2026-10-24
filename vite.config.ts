import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 사용자 사이트(username.github.io)라서 base는 루트('/')입니다.
export default defineConfig({ plugins: [react()], base: '/' });
