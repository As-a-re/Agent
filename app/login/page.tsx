import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 font-bold text-2xl mb-2">
          <span className="text-primary">Service</span>
          <span>Genius</span>
        </div>
        <p className="text-muted-foreground">AI-powered customer service optimization</p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Log in with your Salesforce credentials</p>
        <p>The security token will be added automatically</p>
      </div>
    </div>
  )
}

