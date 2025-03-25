import { useRef, useState } from "react";
import { userChatstore } from "../store/userChatstore";
import { X ,Image ,Send} from 'lucide-react'
function MessageInput() {
    const [text, setText] = useState("");
    const [imgPre, setImgpre] = useState(null);
    const fileInputRef = useRef(null);
    const { SendMessages } = userChatstore();
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgpre(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const Removeimg = (e) => {
        setImgpre(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
    const handleSendMessage =  async(e) => {
        e.preventDefault();
        if (!text.trim() && !imgPre) return;
        try {
            await SendMessages({
                text: text.trim(),
                image: imgPre,
            });
            // clear form
            setText("");
            setImgpre(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }
    
    return (
        <>
            <div className="p-4 w-full">
                {imgPre && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="">
                            <img src={imgPre} alt="" className="w-20 h-20 object-cover rounded-lg border border-zinc-800" />
                            <button onClick={Removeimg} className="absolute rounded-full bg-base-300 flex  ">
                           <X className="size-3"/>
                            </button>
</div>
                        </div>
                )}  
                <form onSubmit={handleSendMessage}>
                    <div className=" flex flex-1 gap-2 ">
                        <input type="text"
                            placeholder="Type your message...."
                            className="w-full  input input-bordered rounded-lg input-sm: input-md"
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
                        <input type="file"
                            accept="image"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImage} />
                        <button className={`hidden sm:flex btn btn-circle ${imgPre ? 'text-emerald-500' : 'text-zinc-500'}`} onClick={(e) => { e.preventDefault(); fileInputRef.current?.click() }}>
                            <Image size={30} className="rounded-lg"/>
                        </button>
                        <button type="submit"
                        className="btn btn-circle btn-sm"
                    disabled={!text.trim() && !imgPre}
                    >
<Send size={32}/>
                    </button>
                    </div>
               
                </form>
        </div>
        </>
    )
}
export default MessageInput;