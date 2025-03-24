import { MessageSquare } from'lucide-react'
function NoChat() {
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center p-16 bg-base-100/50'>
                <div className='animate-bounce w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center '>
                    <MessageSquare className=' w-8 h-8  size-5 text-primary'/>
                </div>
                <div className='text-center p-4'>
                    <h2 className='text-2xl font-semibold'>Welcome To ChatMe!</h2>
                    <p className='text-base-content/60'>select a user from the sidebar to start chating</p>
                </div>
        </div>
        </>
    )
}
export default NoChat;