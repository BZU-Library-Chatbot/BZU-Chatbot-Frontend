import { sendCode } from "../../components/web/sendCode/api";

const Arabic = {
  admin: {},
  about: {
    team: "فريقنا المبدع",
    whoWeAre: "من نحن",
    whoWeAreBody:
      "نحن فريق من طلاب جامعة بيرزيت نحب للتكنولوجيا والابتكار. تقودنا رغباتنا في إيجاد حلول تؤثر إيجابا على المجتمع. قمنا بإنشاء موقع المساعد الالي الذكي لمكتبة جامعة بيرزيت لاستكمال متطلبات مشروع التخرج. هدفنا هو توفير أداة مفيدة وسهلة الاستخدام تساعد الطلاب في الوصول إلى موارد المكتبة بسهولة أكبر.",
    tariq: "طارق قرعان",
    raghad: "رغد عقل",
    aziza: "عزيزة كركرة",
  },
  home: {
    enterMessage: "أدخل رسالتك هنا",
  },
  login: {
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgetPassword: "نسيت كلمة السر؟",
    noAccount: "لا يوجد لديك حساب بعد؟",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
  },
  register: {
    username: "اسم المستخدم",
    email: "البريد الالكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    registerSuccess:
      "تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتسجيل الدخول!",
  },
  sendCode: {
    email: "البريد الالكتروني",
    send:"أرسال",
    login: "عد الى صفحة تسحيل الدخول",
    success:"تم ارسال الرمز بنجاح تفقد بريدك الالكتروني",
  },
  forgetPassword: {
    code: "الرمز",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    confirm: "تأكيد",
    login: "عد الى صفحة تسحيل الدخول",
    success: "تم تحديث كلمة المرور بنجاح"
  },
  navbar: {
    menu: "القائمة",
  },
  sidebar: {
    newChat: "دردشة جديدة",
    logout: "تسجيل الخروج",
    faildUpadateTitle: "فشل تحديث عنوان المحادثة",
  },
  settings: {
    language: "اللغة",
    change: "تغيير كلمة المرور",
    saved: "تم حفظ الإعدادات بنجاح!",
    passwordChanged: "تم تغيير كلمة المرور بنجاح!",
    changeImage: "تغيير الصورة",
    oldPassword: "كلمة المرور القديمة",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    johnDoe: "جون، دو",
    passwordRequirements: "متطلبات كلمة المرور",
    requirementsText:
      "لإنشاء كلمة مرور جديدة، يجب عليك تلبية جميع المتطلبات التالية:",
    requirements: [
      "الحد الأدنى 8 أحرف",
      "على الأقل حرف خاص",
      "على الأقل رقم واحد",
      "لا يمكن أن تكون نفس كلمة المرور السابقة",
    ],
    errorPicture: "خطأ في تغيير الصورة!",
    pictureChanged: "تم تغيير الصورة بنجاح!",
    errorPassword: "خطأ في تغيير كلمة المرور!",
    differentPassword: "كلمة المرور القديمة والجديدة لا يمكن أن تكونا نفسها!",
  },
  global: {
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    copyRights: "© 2023-2024 BZU-Library-Chatbot - جميع الحقوق محفوظة.",
    title: "BZU Library Chatbot",
    home: "الصفحة الرئيسية",
    about: "حول",
    sendCode: "أرسل كود",
    forgetPassword: "نسيت كلمة المرور",
    settings: "الإعدادات",
    serverError: "خطأ في الخادم!",
    submit: "تأكيد",
  },
  errorPage: {
    header: "404 الصفحة غير موجودة",
    body: "للاسف، الصفحة التي تبحث عنها غير موجودة.",
    backToHome: "الرجوع الى الصفحة الرئيسية",
  },
  validation: {
    usernameRequired: "يرجى ادخال اسم المستخدم",
    userNameMinLength: "يجب أن يكون اسم المستخدم على الأقل ثلاث أحرف",
    userNameMaxLength: "يجب أن يكون اسم المستخدم على الأكثر 30 حرف",
    emailRequired: "يرجى ادخال البريد الالكتروني ",
    validEmail: "يرجى ادخال بريد الكتروني صحيح",
    passwordLength: "كلمة السر يجب أن تكون 8 أحرف على الأقل",
    containsNumber: "كلمة السر يجب أن تحتوي رقم على الأقل",
    containsLowercase: "كلمة السر يجب أن تحتوي حرف صغير على الأقل",
    containsUppercase: "كلمة السر يجب أن تحتوي حرف كبير على الأقل",
    PasswordRequired: "يرجى ادخال كلمة السر ",
    passwordMatch: "يجب أن تتطابق كلمتا السر",
    cPasswordRequired: "يرجى تأكيد كلمة المرور  ",
    codeRequired: "يرجى ادخال الكود",
    codeLength: "يجب أن يكون الرمز 4 أحرف فقط",
    newPasswordRequired: "يجب أن تختلف كلمة السر الجديدة عن القديمة",
  },
  feedback: {
    title: "أضف مراجعة",
    body: "كيف كانت الاجابة؟",
    Close: "أغلاق",
  },
};

export default Arabic;
