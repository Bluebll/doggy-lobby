import LoginForm from './LoginForm'

export default async function LoginPage() {

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage Doggy Lobby</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
