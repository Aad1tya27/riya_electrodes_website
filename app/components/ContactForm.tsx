'use client'
import { sendMailAction } from "../actions/sendMail"
import { useRef, useState } from "react"


type ToastType = 'success' | 'error'

interface Toast {
    type: ToastType
    message: string
}

export default function ContactForm() {
    const [toast, setToast] = useState<Toast | null>(null)
    const [loading, setLoading] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const result = await sendMailAction(formData)
        if (result.success) {
            setToast({ type: 'success', message: 'Message sent!' })
            formRef.current?.reset()
        } else {
            setToast({ type: 'error', message: 'Failed to send message.' })
        }

        setLoading(false)
        setTimeout(() => setToast(null), 3000)
    }
    return (
        <>
            {toast && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-500
          ${toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'}
        `}>
                    {toast.message}
                </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl">
                <div>
                    <label htmlFor="name" className="block mb-2 text-medium-brown font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-medium-brown font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2 text-medium-brown font-medium">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full p-4 border border-tan-blonde rounded-lg focus:ring-2 focus:ring-medium-brown focus:border-transparent transition-all duration-300"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className={`w-full btn-primary py-4 rounded-lg font-semibold text-lg shadow-lg transition-opacity duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </>
    )
}
