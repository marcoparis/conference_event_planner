import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/conference_event_planner/',
  plugins: [react()],
})
