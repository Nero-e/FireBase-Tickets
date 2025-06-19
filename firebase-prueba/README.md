# 🤖 Groq API - Envío de Tickets FullStack - Next.js 15 + FireBase Data

un sistema de envío de tickets con asunto y mensaje **fullstack** donde los usuarios pueden recibir una respuesta automática generada por un botón (Simulado) o tambien tiene la funcion de recibir una respuesta conectandose a la IA Groq, usando: 
- **Frontend:** Next.js (React). TailwindCSS, Shadcn/ui, Zustand (Estado global), React Query (Mutaciones), React Hook Form (Formulario), Zod (Validaciones).
- **Backend:** Firebase - Firestore Database (alamacenamiento de tickets)
- **IA:** [Groq API](https://console.groq.com/docs/api-reference#chat) (Modelo:llama-3.3-70b-versatile) (Bajo que criterios responde Groq) [ "Asistente de bienes raíces en colombia y maiami amable y directo"]

---

## 🚀 Scripts

```bash
# Intalar dependencias
npm install

# Ejecutar el proyecto en modo desarrollo
npm  run dev

# Lint 
npm run lint

# Build de producción
npm run build

```

## 🔐 ENV

```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=TU_FIREBASE_KEY
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=TU_PROJECT_ID
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
    NEXT_PUBLIC_FIREBASE_APP_ID=TU_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=TU_MEASUREMENT_ID
    GROQ_API_KEY=TU_GROQ_API_KEY
```