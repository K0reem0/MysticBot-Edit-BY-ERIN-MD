import axios from 'axios';

let handler = async (m, { conn, command }) => {
    let chat = global.db.data.chats[m.chat];

    // رقمك الخاص لاستقبال الإشعارات
    const ownerJid = '966560801636@s.whatsapp.net'; // ضع رقمك هنا بصيغة واتساب الدولية

    // Initialize the test command setting if not already defined
    if (chat.testCommand === undefined) {
        chat.testCommand = false; // Set to off by default
    }

    // Toggle the feature with each 'تست' command
    if (command === 'تست') {
        chat.testCommand = !chat.testCommand; // Toggle between true and false
        
        let statusMessage = `🚀 وضع الكشف عن النص الغامق: ${chat.testCommand ? 'مفعل ✅' : 'معطل ❌'}`;
        
        // إرسال الإشعار إلى رقمك الخاص
        await conn.sendMessage(ownerJid, { text: statusMessage });
    }
};

// Function to detect and respond to bold text
handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat];

    if (chat.testCommand && /\*([^*]+)\*/.test(m.text)) { // Check for bold text
        let boldText = m.text.match(/\*([^*]+)\*/)[1]; // Extract bold text (question)

        // Indicate typing status
        await conn.sendPresenceUpdate('composing', m.chat);

        try {
            let response = await askAI(boldText); // Get AI response
            response = response.replace(/\.$/, ''); // إزالة النقطة في نهاية الجواب إذا وُجدت

            // Add a 3-second delay before sending the message
            setTimeout(async () => {
                await conn.sendMessage(m.chat, { text: response });
            }, 2500); // 3000 milliseconds = 3 seconds
        } catch (error) {
            console.error('🚩 خطأ في استعلام الذكاء الاصطناعي:', error);
            await conn.sendMessage(m.chat, { text: '❌ خطأ في استجابة الذكاء الاصطناعي، حاول مرة أخرى' });
        }
    }
};

// API function to interact with AI
async function askAI(question) {
    try {
        const response = await axios.post("https://luminai.my.id/", {
            content: question,
            user: "أرثر",
            prompt: `أجب عن السؤال او الفزورة التالية سواء كانت دينية او متنوعة اجابة دقيقة بدون أي إضافات أو مقدمات، فقط الجواب النهائي بدون نقطة في النهاية: ${question}`,
            webSearchMode: false
        });

        return response.data.result.trim(); // Return only the clean answer
    } catch (error) {
        throw error;
    }
}

// Define the command trigger
handler.command = /^تست$/i;
handler.rowner = true;
handler.group = true;

export default handler;
