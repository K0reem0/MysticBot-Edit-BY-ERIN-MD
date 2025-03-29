import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {  
    // إنشاء الرسالة التفاعلية بدون صورة  
    const interactiveMessage = {  
        header: {  
            title: `*❃ ───────⊰ ❀ ⊱─────── ❃*

◆┋أستماراتـ الأساسيه┋◆

 *❃ ───────⊰ ❀ ⊱─────── ❃*

 ⚜︎┊ا استمارة *سؤال مفاجئ*  اطلب 
✧ بيتا س1      
    
❃ ───────⊰ ❀ ⊱─────── ❃

 ⚜︎┊ا استمارة *الإجابة*  اطلب 
✧ بيتا ج1 

❃ ───────⊰ ❀ ⊱─────── ❃

 ⚜︎┊ا استمارة *المسابقة*  اطلب 
✧ بيتا مسابقة

❃ ───────⊰ ❀ ⊱─────── ❃

 ⚜︎┊ا استمارة *النتائج*  اطلب 
✧ بيتا نتائج 

❃ ───────⊰ ❀ ⊱─────── ❃

⚜︎┊ا استمارة *الفعاليات*  اطلب 
✧ بيتا فعالية
 
❃ ───────⊰ ❀ ⊱─────── ❃

 ⚜︎┊ا استمارة *جوائز*  اطلب 
✧ بيتا جوائز 
  
❃ ───────⊰ ❀ ⊱─────── ❃

⚜︎┊ا استمارة *جوائز الفرق* اطلب
✧بيتا فرق

❃ ───────⊰ ❀ ⊱─────── ❃

 ⚜︎┊ا استمارة *المشاركين*  اطلب 
✧ بيتا مشاركين 

❃ ───────⊰ ❀ ⊱─────── ❃

  ⚜︎┊ا استمارة *نقاش*  اطلب 
✧ بيتا نقاش 

❃ ───────⊰ ❀ ⊱─────── ❃

  ⚜︎┊ا استمارة *إنتهى النقاش*  اطلب 
✧ بيتا انتهى 

❃ ───────⊰ ❀ ⊱─────── ❃

⚜︎┊استمارة *سؤال ديني*  اطلب
✧ بيتا سؤال ديني

📜 *أختر من الأقسام ما يناسبك*

*❃ ───────⊰ ❀ ⊱─────── ❃*

*⚜︎ 📯 ┃ادارة•* ﹝𝑺𝒑𝒂𝒓𝒕𝒂﹞`,  
        },  
        body: {  
            text: '*❃ ───────⊰ ❀ ⊱─────── ❃*\n',  
        },  
        nativeFlowMessage: {  
            buttons: [  
                {  
                    name: 'single_select',  
                    buttonParamsJson: JSON.stringify({  
                        title: '❀ الاقسام ❀',  
                        sections: [  
                            {  
                                title: 'الاستمارات',  
                                highlight_label: 'آرثر',  
                                rows: [  
                                    { header: '❀ سؤال مفاجئ ❀', title: 'بيتا س1', id: '.بيتا_س1'},  
                                    { header: '❀ الإجابة ❀', title: '❃ أوامر التحميل ❃', id: '.بيتا_ج1' },  
                                    { header: '❀ المسابقة ❀', title: '❃ أوامر الترفيه ❃', id: '.بيتا_مسابقة' },  
                                    { header: '❀ النتائج ❀', title: '❃ أوامر الحياة الافتراضية ❃', id: '.بيتا_نتائج' },  
                                    { header: '❀ الفعاليات ❀', title: '❃ أوامر التحويل ❃', id: '.بيتا_فعالية' },  
                                    { header: '❀ جوائز ❀', title: '❃ أوامر الـديـني ❃', id: '.بيتا_جوائز' },  
                                    { header: '❀ جوائز الفرق ❀', title: '❃ أوامر آرثر ❃', id: '.بيتا_فرق' },  
                                    { header: '❀ المشاركين ❀', title: '❃ أوامر الألقاب ❃', id: '.بيتا_مشاركين' },  
                                    { header: '❀ نقاش ❀', title: '❃ جميع الأوامر ❃', id: '.بيتا_نقاش' },  
                                    { header: '❀ بيتا انتهى ❀', title: '❃ أوامر الألقاب ❃', id: '.إنتهى_النقاش' },  
                                    { header: '❀ سؤال ديني ❀', title: '❃ جميع الأوامر ❃', id: '.بيتا_سؤال_ديني' },  
                                ],  
                            },  
                        ],  
                    }),  
                    messageParamsJson: '',  
                },  
            ],  
        },  
    };  

    // إنشاء الرسالة  
    let msg = generateWAMessageFromContent(  
        m.chat,  
        {  
            viewOnceMessage: {  
                message: {  
                    interactiveMessage,  
                },  
            },  
        },  
        { userJid: conn.user.jid, quoted: m }  
    );  

    // إرسال الرسالة  
    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });  
};  

handler.help = ['info'];  
handler.tags = ['main'];  
handler.command = ['بيتا1'];  

export default handler;
