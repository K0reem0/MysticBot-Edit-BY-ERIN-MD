let addingForms = false;
let forms = {};
let currentFormKey = null;

let handler = async (m, { conn, command, args }) => {
    if (command === "تشغيل_الاضافة") {
        addingForms = true;
        forms = {};
        currentFormKey = null;
        await conn.sendMessage(m.chat, { text: "✅ *تم تشغيل وضع إضافة الاستمارات!*\n\n📌 أرسل اسم الاستمارة (الكيس) أولًا، ثم أرسل نص الاستمارة بعدها.\n\n✍️ *مثال:* \n1️⃣ `form_test`\n2️⃣ `📜 *هذه استمارة تجريبية*\n- سؤال 1...\n- سؤال 2...`" }, { quoted: m });
    } 
    
    else if (command === "ايقاف_الاضافة") {
        if (!addingForms) {
            return await conn.sendMessage(m.chat, { text: "⚠️ *وضع الإضافة غير مفعل!*\nاستخدم `.تشغيل_الاضافة` لبدء إضافة الاستمارات." }, { quoted: m });
        }

        addingForms = false;
        currentFormKey = null;
        let formCode = generateFormCode(forms);
        await conn.sendMessage(m.chat, { text: `✅ *تم إنهاء وضع الإضافة!*\n📜 *عدد الاستمارات المضافة:* ${Object.keys(forms).length}\n\n🔹 *هذا هو كود الاستمارات:* \n\`\`\`js\n${formCode}\n\`\`\`` }, { quoted: m });
    }
};

handler.all = async function (m) {
    if (!addingForms || !m.text) return;

    let id = m.chat;
    let text = m.text.trim();

    if (!currentFormKey) {
        if (forms[text]) {
            await conn.sendMessage(id, { text: "⚠️ *هذا الاسم مستخدم بالفعل!*\nأرسل اسمًا آخر للاستمارة." }, { quoted: m });
            return;
        }
        currentFormKey = text;
        forms[currentFormKey] = "";
        await conn.sendMessage(id, { text: `✅ *تم تسجيل اسم الاستمارة:* \`${currentFormKey}\`\n✍️ الآن أرسل نص الاستمارة.` }, { quoted: m });
    } 
    
    else {
        forms[currentFormKey] = text;
        await conn.sendMessage(id, { text: `✅ *تم حفظ نص الاستمارة تحت الكيس:* \`${currentFormKey}\`\n📌 *عدد الاستمارات المسجلة:* ${Object.keys(forms).length}\n\n🔹 أرسل اسم استمارة جديدة أو أرسل \`.ايقاف_الاضافة\` لإنهاء العملية.` }, { quoted: m });
        currentFormKey = null;
    }
};

// أوامر الهاندلر
handler.command = ['تشغيل_الاضافة', 'ايقاف_الاضافة'];

export default handler;

// دالة توليد كود الاستمارات
function generateFormCode(forms) {
    let code = `let handler = async (m, { conn, command }) => {\n    let formText = "";\n\n    switch (command) {\n`;
    for (let key in forms) {
        code += `        case "${key}":\n            formText = \`${forms[key]}\`;\n            break;\n\n`;
    }
    code += `        default:\n            return;\n    }\n\n    await conn.sendMessage(m.chat, { text: formText }, { quoted: m });\n};\n\nhandler.command = [${Object.keys(forms).map(f => `"${f}"`).join(", ")}];\n\nexport default handler;`;
    return code;
}
