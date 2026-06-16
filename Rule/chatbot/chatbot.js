/**
 * Laboratory Smart Assistant - Local Offline Q&A Chatbot
 * This script runs completely client-side and matches user queries against a local laboratory safety & equipment database.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Knowledge Base Database
  const qaDatabase = [
    {
      id: "ph_calibration",
      keywords: ["کالیبره", "کالیبراسیون", "پی اچ", "پ هاش", "بافر", "اسید", "ph", "calibrate", "calibration", "buffer"],
      answer: `<strong>راهنمای کالیبراسیون pH متر رومیزی (PH500):</strong><br>
      ۱. الکترود را با آب مقطر شسته و با دستمال کاغذی نرم بدون پرز به آرامی خشک کنید.<br>
      ۲. کلید <strong>CAL</strong> را جهت ورود به کالیبراسیون فشار دهید. صفحه عبارت <code>Wait</code> را نشان می‌دهد.<br>
      ۳. الکترود را در بافر اول (۷.۰۰ یا ۶.۸۶) قرار دهید. منتظر بمانید تا مقدار پایدار شده و درصد شیب نمایش داده شود و کالیبراسیون نقطه اول ذخیره شود.<br>
      ۴. الکترود را مجدداً شسته و خشک کنید. سپس آن را در بافر دوم (۴.۰۱ یا ۱۰.۰۱) قرار داده و پس از پایداری عدد، کلید <strong>ENT</strong> را فشار دهید.<br>
      ۵. در نهایت جهت ثبت و خروج کلید <strong>MODE / ESC</strong> را بزنید. درصد شیب الکترود (Slope) نهایی باید بین ۹۵٪ تا ۱۰۵٪ باشد.`
    },
    {
      id: "centrifuge_formula",
      keywords: ["فرمول", "محاسبه", "سانتریفیوژ", "دور", "شتاب", "rcf", "rpm", "شعاع", "روتور", "تبدیل", "formula", "calculation", "centrifuge"],
      answer: `<strong>فرمول فیزیک دوران سانتریفیوژ (RCF &leftrightarrow; RPM):</strong><br>
      شتاب نسبی گریز از مرکز (RCF) به صورت زیر محاسبه می‌شود:<br>
      $$RCF = 1.12 \\times \\text{Radius (mm)} \\times \\left(\\frac{\\text{RPM}}{1000}\\right)^2$$<br>
      که در آن <code>Radius</code> شعاع روتور بر حسب میلی‌متر و <code>RPM</code> سرعت دورانی است. برای محاسبه آنلاین می‌توانید به بخش سانتریفیوژ در تب تجهیزات رفته و از ماشین‌حساب تعبیه‌شده استفاده کنید.`
    },
    {
      id: "oven_errors",
      keywords: ["خطا فور", "خطا آون", "کدهای خطا فور", "کد خطا آون", "e.h.t", "lo.t", "e.sen", "door", "oven error", "oven errors", "آلارم فور"],
      answer: `<strong>راهنمای کدهای خطای دستگاه فور (Oven):</strong><br>
      - <strong>E.H.t:</strong> افزایش دمای محفظه بیش از حد مجاز (احتمال قفل رله المنت یا قطع ترموستات حفاظتی).<br>
      - <strong>Lo.t:</strong> کاهش دما کمتر از حد خطا (احتمال نشت حرارتی درب یا عملکرد ضعیف المنت).<br>
      - <strong>t:</strong> عدم رسیدن به دما در ۳ ساعت پس از شروع (نشانه سوختن المنت یا خرابی برد قدرت).<br>
      - <strong>E.SEN:</strong> خرابی یا قطع اتصال سنسور دمای PT100.<br>
      - <strong>صدای بوق مداوم:</strong> درب دستگاه بیش از ۱۵ ثانیه باز مانده است.`
    },
    {
      id: "ph_errors",
      keywords: ["خطا پی اچ", "خطا پ هاش", "کد خطا پی اچ", "err.cal", "err.temp", "no.stb", "or/ur", "ph error", "ph errors", "آلارم پی اچ"],
      answer: `<strong>راهنمای خطاهای دستگاه pH متر:</strong><br>
      - <strong>Err.Cal:</strong> خطای کالیبراسیون (نشانه کثیفی غشای الکترود، آلودگی بافرها یا طول عمر بالای الکترود شیشه‌ای).<br>
      - <strong>Err.Temp:</strong> عدم شناسایی سنسور دما (سنسور ATC قطع یا خراب است؛ سوکت پشتی را چک کنید).<br>
      - <strong>no.Stb:</strong> عدم ثبات عدد (وجود حباب هوا زیر الکترود، کثیفی غشا یا ناهماهنگی نمونه).<br>
      - <strong>OR/UR:</strong> خارج از محدوده اندازه‌گیری (پ هاش نمونه زیر ۰ یا بالای ۱۴ است یا کابل کواکسیال قطع است).`
    },
    {
      id: "waste_rules",
      keywords: ["پسماند", "دفع", "حلال", "اسید", "سطل پسماند", "گالن پسماند", "دور ریختن", "سینک", "disposal", "waste", "chemical waste", "solvents"],
      answer: `<strong>قوانین دفع پسماندهای شیمیایی در آزمایشگاه پسماند:</strong><br>
      تخلیه هرگونه اسید، باز، حلال و مواد سمی در سینک آزمایشگاه <strong>اکیداً ممنوع</strong> است. پسماندها باید در گالن‌های مخصوص و لیبل‌دار زیر هود تخلیه شوند:<br>
      - <strong>گروه A (سبز/یاقوتی):</strong> حلال‌های آلی غیرهالوژنه (مانند استون، اتانول، متانول).<br>
      - <strong>گروه B (زرد):</strong> حلال‌های آلی هالوژنه (مانند کلروفرم، دکلرومتان).<br>
      - <strong>گروه C (آبی/قرمز):</strong> پسماندهای اسیدی و بازی آبی.<br>
      قبل از تخلیه پسماند، همواره برگه سازگاری شیمیایی پسماندها را بررسی کنید.`
    },
    {
      id: "safety_wear",
      keywords: ["لباس", "پوشش", "روپوش", "عینک", "دستکش", "کفش", "ماسک", "ایمنی", "پوشش ایمنی", "clothing", "wear", "gloves", "goggles", "coat"],
      answer: `<strong>پوشش ایمنی الزامی برای حضور در آزمایشگاه پسماند:</strong><br>
      ۱. <strong>روپوش آزمایشگاهی:</strong> سفید، نخی و دکمه‌دار (همواره بسته نگه دارید).<br>
      ۲. <strong>عینک ایمنی:</strong> در تمام مدت کار با مواد شیمیایی و اسیدها برای محافظت از چشم الزامی است.<br>
      ۳. <strong>دستکش مناسب:</strong> دستکش نیتریل یا لاتکس سالم (دستکش کارکرده نباید از آزمایشگاه خارج شود).<br>
      ۴. <strong>کفش کاملاً بسته:</strong> پوشیدن کفش‌های صندل، دمپایی یا کفش‌های پارچه‌ای نازک کاملاً ممنوع است.<br>
      ۵. <strong>شلوار بلند:</strong> پوشیدن شلوارک یا دامن در محیط کار با مواد شیمیایی ممنوع است.`
    },
    {
      id: "hours_info",
      keywords: ["ساعت", "روزها", "زمان", "باز", "بسته", "ساعات", "تایم", "ساعت کار", "schedule", "hours", "open", "close", "times"],
      answer: `<strong>ساعات کاری آزمایشگاه پسماند:</strong><br>
      آزمایشگاه در روزهای شنبه تا چهارشنبه از <strong>ساعت ۷:۰۰ صبح الی ۱۶:۰۰ بعد از ظهر</strong> فعال است. کار در خارج از این ساعات کار تنها با مجوز کتبی و حضور سرپرست آزمایشگاه مجاز است.`
    },
    {
      id: "emergency_info",
      keywords: ["اورژانس", "آتش", "زنگ", "شماره", "تماس", "کمک", "تلفن", "sos", "emergency", "fire", "help", "phone", "سوختگی"],
      answer: `<strong>اقدامات و شماره‌های اضطراری آزمایشگاه:</strong><br>
      در صورت بروز حادثه، خونسردی خود را حفظ کرده و در صورت نیاز دکمه قرمز <strong>SOS (فوریت‌ها)</strong> در پایین سمت چپ صفحه را بفشارید. شماره‌های مهم:<br>
      - <strong>آتش‌نشانی:</strong> ۱۲۵<br>
      - <strong>اورژانس پزشکی:</strong> ۱۱۵<br>
      - <strong>مسئول آزمایشگاه پسماند:</strong> ۰۹۱۲۳۴۵۶۷۸۹<br>
      - <strong>نگهبانی و حفاظت دانشگاه:</strong> داخلی ۴۴۴۴<br>
      در صورت پاشش اسید، بلافاصله موضع را به مدت حداقل ۱۵ دقیقه زیر دوش ایمنی یا چشم‌شوی بشویید.`
    },
    {
      id: "centrifuge_balancing",
      keywords: ["بالانس", "تعادل سانتریفیوژ", "تراز سانتریفیوژ", "لوله سانتریفیوژ", "قرینه", "رعایت بالانس", "balance", "balancing"],
      answer: `<strong>اصول قرینه‌سازی و بالانس سانتریفیوژ:</strong><br>
      ۱. لوله‌های نمونه قرار داده شده در روتور باید از نظر حجم و وزن کاملاً یکسان باشند.<br>
      ۲. لوله‌ها باید به صورت <strong>دقیقاً قرینه (۱۸۰ درجه روبه‌روی هم)</strong> قرار گیرند.<br>
      ۳. هرگز دستگاه را با روتور نابالانس استارت نکنید؛ این کار باعث لرزش شدید، آسیب به شفت موتور سانتریفیوژ و خطرات HSE جدی می‌گردد.`
    },
    {
      id: "ph_electrode_maintenance",
      keywords: ["نگهداری الکترود", "محلول نگهداری", "کی سی ال", "kcl", "خشک شدن الکترود", "شستشوی الکترود", "maintenance", "electrode"],
      answer: `<strong>دستورالعمل نگهداری و شستشوی الکترود pH متر:</strong><br>
      - <strong>نگهداری همیشگی:</strong> غلاف الکترود شیشه‌ای هرگز نباید خشک بماند. همواره آن را در محلول <strong>۳ مولار KCl (پتاسیم کلرید)</strong> یا بافر ۴ نگهداری کنید. نگهداری در آب مقطر به شدت به الکترود آسیب می‌زند.<br>
      - <strong>شستشوی رسوبات چربی/روغن:</strong> الکترود را با محلول آب‌صابون گرم یا اتانول به مدت چند ثانیه شستشو داده و سپس آبکشی کنید.<br>
      - <strong>شستشوی رسوبات معدنی/پروتئینی:</strong> الکترود را ۵ دقیقه در اسید کلریدریک رقیق (0.1M HCl) قرار داده و سپس آبکشی نمایید.`
    },
    {
      id: "acid_base_dilution",
      keywords: ["رقیق‌سازی", "اسیدها و بازها", "آب روی اسید", "گرماده", "خنثی‌سازی", "گرمازا", "اسید غلیظ", "باز قوی", "acid base dilution", "diluting acids"],
      answer: `<strong>نکات ایمنی رقیق‌سازی اسیدها و بازها:</strong><br>
      ۱. <strong>هرگز آب را روی اسید نریزید:</strong> به دلیل واکنش شدید و پرتاب اسید، باید ابتدا آب درون بشر ریخته شود و اسید به آرامی، به صورت تدریجی و زیر هود به آن اضافه گردد.<br>
      ۲. <strong>رقیق‌سازی بازها:</strong> این فرآیند به شدت گرمازا است. باز باید به صورت بسیار آرام و مرحله‌به‌مرحله به آب اضافه شود تا دما کنترل شود.<br>
      ۳. <strong>مخلوط مستقیم اسید غلیظ و باز قوی ممنوع است:</strong> برای خنثی‌سازی، ابتدا هر دو ماده را رقیق کنید (مثلاً ۱ مولار) و سپس آنها را ترکیب نمایید.`
    },
    {
      id: "glassware_damage",
      keywords: ["شکستن ظروف", "شستشوی ظروف", "خسارت", "جایگزین", "تمیز کردن ظروف", "شیشه آلات", "glassware", "broken glassware"],
      answer: `<strong>دستورالعمل نظافت و خسارت ظروف شیشه‌ای:</strong><br>
      ۱. دانشجو موظف است پس از کار با شیشه‌آلات و وسایل عمومی، آنها را کاملاً تمیز کرده و در جای خود قرار دهد.<br>
      ۲. در صورت بروز خسارت یا شکستن لوازم شیشه‌ای آزمایشگاه، دانشجو موظف به **تهیه مجدد و جایگزینی** آن می‌باشد. در صورت وجود مشکل، مراتب را سریعاً به مسئول آزمایشگاه گزارش دهید.`
    },
    {
      id: "workspace_cleanliness",
      keywords: ["سفره یکبارمصرف", "میز کار", "تمیز کردن میز", "سفره", "بهداشت", "نظافت میز", "table setup", "clean bench"],
      answer: `<strong>بهداشت و نظافت میز کار:</strong><br>
      ۱. پیش از شروع کار روی میز کار آزمایشگاهی را با <strong>سفره یکبارمصرف</strong> بپوشانید تا از آلودگی میز جلوگیری شود.<br>
      ۲. پس از اتمام فعالیت، سفره را در سطل زباله انداخته و سطح میز را با یک پارچه نمدار کاملاً تمیز کنید.`
    },
    {
      id: "leaving_lab",
      keywords: ["ترک آزمایشگاه", "قفل کردن", "خاموش کردن کولر", "چراغ ها", "خروج از آزمایشگاه", "leaving lab"],
      answer: `<strong>دستورالعمل خروج نهایی از آزمایشگاه:</strong><br>
      پس از اتمام کار و پیش از خروج نهایی از محیط آزمایشگاه، دانشجو موظف است موارد زیر را چک کند:<br>
      ۱. درب ورودی آزمایشگاه قفل شده باشد.<br>
      ۲. تمامی چراغ‌های روشنایی خاموش باشند.<br>
      ۳. کولر یا سیستم تهویه مطبوع به طور کامل خاموش شده باشد.`
    },
    {
      id: "electric_safety",
      keywords: ["ایمنی برق", "جدا کردن دوشاخه", "پریز برق", "قطع برق", "دستگاه برق", "electrical safety", "unplug"],
      answer: `<strong>ایمنی برق و محافظت از دستگاه‌ها:</strong><br>
      بلافاصله پس از اتمام کار با هر کدام از دستگاه‌های آزمایشگاهی (سانتریفیوژ، فور یا pH متر)، جهت ایمنی و جلوگیری از حوادث برق‌گرفتگی یا نوسان ولتاژ، حتماً دوشاخه آن را از پریز برق جدا کنید.`
    },
    {
      id: "theft_prevention",
      keywords: ["خروج اموال", "خروج دستگاه", "خارج کردن وسایل", "بردن وسایل", "وسایل آزمایشگاه", "lab property"],
      answer: `<strong>قانون خروج اموال و تجهیزات:</strong><br>
      هیچ‌یک از تجهیزات، دستگاه‌های آزمایشگاهی، مواد شیمیایی پسماند یا نو، لوازم شیشه‌ای و مصرفی به هیچ عنوان و تحت هیچ شرایطی <strong>اجازه خروج از فضای آزمایشگاه پسماند را ندارند</strong> و خروج آنها غیرقانونی است.`
    },
    {
      id: "eating_drinking",
      keywords: ["خوردن", "آشامیدن", "غذا", "نوشیدنی", "آب خوردن", "خوراکی", "eating", "drinking"],
      answer: `<strong>ممنوعیت خوردن و آشامیدن:</strong><br>
      به دلیل حضور مواد شیمیایی خطرناک، پسماندهای اسیدی، بازی و بخارات حلال‌های آلی فرار، هرگونه خوردن، آشامیدن یا نگهداری مواد غذایی در محیط اصلی آزمایشگاه <strong>اکیداً ممنوع</strong> است.`
    },
    {
      id: "pilot_maintenance",
      keywords: ["پایلوت", "محیط پایلوت", "دستگاه پایلوت", "تمیزی پایلوت", "pilot area"],
      answer: `<strong>مقررات محیط پایلوت آزمایشگاه:</strong><br>
      دانشجویانی که دارای سیستم یا دستگاه پایلوت در آزمایشگاه هستند، موظفند همواره محیط اطراف پایلوت خود را کاملاً مرتب، تمیز و عاری از هرگونه آلودگی، نشتی پسماند یا بی‌نظمی نگه دارند.`
    },
    {
      id: "allowed_students",
      keywords: ["دانشجویان مجاز", "لیست دانشجویان", "افراد مجاز", "مجوز کار", "مدت حضور", "۹ ماه", "ارشد", "authorized students"],
      answer: `<strong>قوانین حضور و افراد مجاز در آزمایشگاه:</strong><br>
      ۱. تنها دانشجویانی که نام آنها در لیست پیوست تاییدشده توسط سرپرست درج شده است، اجازه حضور و کار دارند.<br>
      ۲. حداکثر مدت حضور در آزمایشگاه برای دانشجویان کارشناسی ارشد <strong>۹ ماه</strong> است.<br>
      ۳. کار با هر دستگاهی تنها پس از دریافت آموزش کامل مجاز است.`
    },
    {
      id: "penalties_rules",
      keywords: ["جریمه", "محرومیت", "تعلیق", "تخطی", "رعایت نکردن قوانین", "ممنوعیت ورود", "۱۰ روز", "violations", "penalties"],
      answer: `<strong>عواقب و جریمه تخطی از قوانین آزمایشگاه پسماند:</strong><br>
      در صورتی که هر یک از دانشجویان کارشناسی ارشد یا دکتری از مقررات کلی آزمایشگاه (شامل ساعات کاری، پوشش حفاظتی، دفع پسماند در سینک، نظافت ظروف و...) تخطی کند، **به مدت ۱۰ روز از فعالیت و ورود به آزمایشگاه محروم خواهد شد**.`
    },
    {
      id: "emergency_hospitals",
      keywords: ["بیمارستان", "لقمان", "فارابی", "مطهری", "سوختگی پوست", "سوختگی چشم", "مسمومیت شیمیایی", "آدرس بیمارستان", "hospitals"],
      answer: `<strong>مراکز درمانی و بیمارستان‌های تخصصی فوریت‌ها:</strong><br>
      - <strong>بیمارستان لقمان (مسمومیت‌های شیمیایی):</strong> تلفن <code>۰۲۱-۵۵۴۱۹۰۰۵</code> | آدرس: خیابان کارگر جنوبی، چهارراه لشگر، خیابان مخصوص.<br>
      - <strong>بیمارستان فارابی (سوختگی‌های چشم):</strong> تلفن <code>۰۲۱-۵۵۴۰۰۰۰۳</code> | آدرس: خیابان کارگر جنوبی، میدان قزوین.<br>
      - <strong>بیمارستان مطهری (سوختگی‌های شدید پوست):</strong> تلفن <code>۰۲۱-۸۸۷۷۰۰۳۱</code> | آدرس: خیابان ولیعصر، بالاتر از میدان ونک، خیابان رشید یاسمی.`
    },
    {
      id: "clean_labs_system",
      keywords: ["سامانه آزمایشگاه های پاک", "کیمیا گستر شریف", "پسماندهای خطرناک", "دفع پسماند خطرناک", "clean labs"],
      answer: `<strong>سامانه مدیریت پسماندهای خطرناک (آزمایشگاه پاک):</strong><br>
      برای هماهنگی جهت انتقال، حمل و دفع اصولی پسماندهای ویژه شیمیایی با شرکت کیمیا گستر شریف تماس بگیرید:<br>
      - <strong>تلفن تماس:</strong> <code>۰۲۱-۶۶۰۸۸۸۰۳</code><br>
      - <strong>آدرس:</strong> تهران، خ آزادی، ضلع غربی دانشگاه صنعتی شریف، خ ولی الله صادقی، پلاک ۳۸.`
    },
    {
      id: "centrifuge_emergency_door",
      keywords: ["درب اضطراری", "باز کردن درب سانتریفیوژ", "قفل اضطراری", "گیر کردن درب", "پیچ گوشتی", "emergency door release"],
      answer: `<strong>نحوه باز کردن اضطراری درب سانتریفیوژ:</strong><br>
      در صورت قطعی برق یا خرابی رله قفل درب، مراحل زیر را اجرا کنید:<br>
      ۱. درب سانتریفیوژ را هم‌زمان به آرامی به سمت پایین فشار دهید.<br>
      ۲. یک سوراخ کوچک در سمت راست بدنه دستگاه تعبیه شده است. پیچ‌گوشتی مخصوص همراه دستگاه را از این سوراخ به داخل هدایت کرده و به آرامی به سمت داخل فشار دهید تا اهرم قفل رها شده و درب باز گردد.`
    },
    {
      id: "centrifuge_basket",
      keywords: ["بسکت ها", "جاگذاری بسکت", "شماره بسکت", "قرار دادن بسکت", "هد دستگاه", "baskets"],
      answer: `<strong>راهنمای جاگذاری بسکت‌ها در سانتریفیوژ:</strong><br>
      هنگام قرار دادن بسکت‌ها در هد (روتور) سانتریفیوژ دقت کنید که هر بسکت باید دقیقاً روبه‌روی شماره متناظر خود که روی هد حک شده قرار گیرد. همچنین شماره حک‌شده روی خودِ بسکت همواره باید به سمت بخش مرکزی هد باشد.`
    },
    {
      id: "centrifuge_ramps",
      keywords: ["شیب ترمز", "ترمز الکتریکی", "fall ramp", "rise ramp", "ramp rate", "شتابگیری", "شتاب گیری"],
      answer: `<strong>تنظیم شتاب افزایش و کاهش دور (Ramp Rate):</strong><br>
      این تنظیمات در منوی <code>4: RAMP RATE SET</code> انجام می‌شود:<br>
      - <strong>شتاب افزایش (Rise Ramp):</strong> بین ۱۰% (آرام‌ترین شتاب) تا ۱۰۰% (سریع‌ترین شتاب). شتاب کمتر پایداری دور دستگاه در لحظه شروع را افزایش می‌دهد.<br>
      - <strong>ترمز و توقف (Fall Ramp):</strong> بین ۱۰% تا ۱۰۰% (در دورهای بالای ۱۰ هزار، حداکثر تا ۶۰% مجاز است):<br>
        &bull; <strong>۱۰% تا ۴۵%:</strong> کاهش تدریجی دور موتور به صورت نرم افزاری.<br>
        &bull; <strong>۵۰%:</strong> توقف کاملاً طبیعی و خلاص بدون اعمال هیچ ترمزی.<br>
        &bull; <strong>۵۵% تا ۱۰۰%:</strong> ترمز الکتریکی فعال (Brake) جهت متوقف کردن سریع هد (عدد بالاتر = ترمز شدیدتر).`
    },
    {
      id: "centrifuge_rotor_limits",
      keywords: ["سرعت روتورها", "تعویض روتور", "آچار بکس", "فالکن ۵۰", "هد فیکس", "میکروتیوب", "rotor limits"],
      answer: `<strong>راهنمای تعویض و محدودیت‌های سرعت روتور (هد):</strong><br>
      ۱. <strong>نحوه تعویض:</strong> پیچ روتور را با استفاده از **آچار بکس** در جهت عقربه‌های ساعت محکم و در خلاف جهت باز کنید. علائم رنگی روتور و شفت موتور باید کاملاً هم‌راستا باشند.<br>
      ۲. <strong>محدودیت سرعت روتور فیکس فالکن (۵۰ و ۱۵):</strong> کارکرد فقط در محدوده <strong>۵۰۰ تا ۱۰,۰۰۰ RPM</strong> مجاز است.<br>
      ۳. <strong>محدودیت سرعت هد فیکس میکروتیوب:</strong> کارکرد فقط در محدوده <strong>۵۰۰ تا ۱۴,۰۰۰ RPM</strong> مجاز است (استفاده در دور بالاتر ممنوع است).`
    },
    {
      id: "oven_continuous",
      keywords: ["کارکرد دائم فور", "کارکرد دائم آون", "تایمر صفر", "off.t", "بدون تایمر", "oven continuous"],
      answer: `<strong>نحوه فعال‌سازی کارکرد دائم فور (Oven):</strong><br>
      اگر نیاز به روشن ماندن دائم دستگاه بدون قطع اتوماتیک دارید:<br>
      زمان تایمر را در هنگام تنظیم روی مقدار <code>0</code> قرار دهید. در این حالت عبارت <code>OFF.t</code> روی نمایشگر ظاهر می‌شود و دستگاه به طور پیوسته روشن مانده و دما را حفظ می‌کند تا زمانی که به صورت دستی خاموش شود.`
    },
    {
      id: "oven_preheating",
      keywords: ["زمان رسیدن به دما", "گرم شدن فور", "گرم شدن آون", "صدای بوق آون", "سه بار بوق", "تایمر معکوس فور"],
      answer: `<strong>عملیات پیش‌گرمایش و آغاز زمان‌سنج فور:</strong><br>
      پس از استارت دستگاه فور، حدود <strong>۳۰ الی ۱۲۰ دقیقه</strong> زمان نیاز است تا محفظه به دمای تنظیم شده برسد. به محض رسیدن به دمای هدف، کنترلر **۳ بار بوق هشدار** پخش کرده و شمارش معکوس تایمر را به طور خودکار از این لحظه آغاز می‌کند.`
    },
    {
      id: "oven_reset_specs",
      keywords: ["ریست کردن فور", "ریست آون", "ولتاژ فور", "فیوز فور", "جریان فور", "توان آون", "oven specifications"],
      answer: `<strong>مشخصات الکتریکی و ریست تنظیمات فور (Oven):</strong><br>
      - <strong>نحوه ریست:</strong> فشردن و نگه داشتن ولوم تنظیم برای **بیش از ۳ ثانیه**، برد کنترلر را ریست می‌کند.<br>
      - <strong>مشخصات الکتریکی:</strong> ولتاژ ورودی 220V AC | حداکثر جریان مصرفی 4.5A | توان مصرفی 1000W | فیوز محافظتی مناسب بین 6A تا 10A.`
    },
    {
      id: "centrifuge_tube_breakage",
      keywords: ["شکستن لوله", "شکستن فالکن", "شکست لوله", "صدا سانتریفیوژ", "آلودگی سانتریفیوژ", "broken tube", "tube break"],
      answer: `<strong>دستورالعمل اضطراری شکستن لوله در سانتریفیوژ:</strong><br>
      ۱. <strong>خاموش کردن فوری:</strong> به محض شنیدن صدای ناهنجار، لرزش شدید یا صدای شکستن، سریعاً کلید خاموش را زده یا دوشاخه را بکشید.<br>
      ۲. <strong>قانون ۳۰ دقیقه صبر:</strong> جهت جلوگیری از استنشاق ایروسل‌های سمی و معلق زیستی/شیمیایی در هوا، به هیچ عنوان **تا ۳۰ دقیقه درب دستگاه را باز نکنید** تا ذرات معلق کاملاً ته‌نشین شوند.<br>
      ۳. <strong>پاکسازی ایمن:</strong> پس از نیم ساعت، با پوشیدن ماسک فیلتردار، دستکش ضخیم نیتریل و عینک ایمنی درب را باز کرده و با پنس تکه‌های شیشه یا فالکن شکسته را بردارید.<br>
      ۴. <strong>ضدعفونی:</strong> کل روتور و محفظه را با پارچه آغشته به محلول <strong>سدیم هیپوکلریت ۳٪</strong> ضدعفونی کنید. هرگز مایعات پاک‌کننده را مستقیماً داخل سانتریفیوژ اسپری نکنید.`
    },
    {
      id: "centrifuge_cleaning",
      keywords: ["تمیز کردن سانتریفیوژ", "نظافت سانتریفیوژ", "سرویس سانتریفیوژ", "ذغال موتور", "ذغال سانتریفیوژ", "clean centrifuge"],
      answer: `<strong>دستورالعمل نظافت و نگهداری فنی سانتریفیوژ:</strong><br>
      - <strong>نظافت روزانه:</strong> محفظه چرخش را روزانه با پارچه مرطوب شده با محلول **سدیم هیپوکلریت ۳٪** تمیز کنید. از پاشش مستقیم آب یا شوینده به داخل شفت خودداری کنید.<br>
      - <strong>بازدید فنی سالانه:</strong> بررسی فنی **ذغال‌های موتور** دستگاه باید سالی یک بار انجام پذیرد تا از جرقه زدن یا افت قدرت موتور جلوگیری شود.<br>
      - <strong>شستشوی بسکت‌ها:</strong> در صورت سرریز نمونه، بسکت‌ها را خارج کرده، با آب گرم و صابون ملایم بشویید و پس از خشک شدن کامل مجدداً جاگذاری کنید.`
    },
    {
      id: "ph_advanced_params",
      keywords: ["تنظیمات پیشرفته pH", "منو set", "پارامتر p01", "پارامتر p02", "پارامتر p03", "پارامتر p04", "پارامتر p05", "ریست کارخانه pH", "parameter setup"],
      answer: `<strong>راهنمای تنظیمات پارامترهای پیشرفته pH متر (منوی SET):</strong><br>
      جهت ورود کلید <strong>SET</strong> را فشار دهید. با کلیدهای جهت‌دار مقادیر را تغییر دهید:<br>
      - <strong>P01 (تنظیمات دما):</strong> کالیبره انحراف سنسور دما یا تغییر دستی دما (۰ تا ۱۰۰ درجه).<br>
      - <strong>P02 (نوع الکترود):</strong> سوئیچ بین الکترود شیشه‌ای (<code>GLAS</code>) و آنتیموان (<code>ANTI</code>).<br>
      - <strong>P03 (بافر استاندارد):</strong> انتخاب بین سیستم استاندارد بافر <code>USA</code> و <code>NIST</code>.<br>
      - <strong>P04 (قفل خودکار داده):</strong> فعال/غیرفعال کردن قفل اتوماتیک صفحه نمایش پس از ثبات عدد (<code>ON/OFF</code>).<br>
      - <strong>P05 (خاموشی خودکار):</strong> فعال‌سازی خاموش شدن خودکار پس از ۱۰ دقیقه عدم استفاده.<br>
      - <strong>P06 (پاک کردن حافظه):</strong> انتخاب گزینه <code>YES</code> برای پاکسازی کامل داده‌های ذخیره‌شده.<br>
      - <strong>P07 (ریست کارخانه):</strong> انتخاب <code>YES</code> جهت بازگرداندن کلیه تنظیمات به پیش‌فرض کارخانه.`
    },
    {
      id: "ph_data_memory",
      keywords: ["ذخیره داده pH", "حافظه pH متر", "پیغام over", "پیغام none", "مرور داده ها pH", "کلید MR", "data memory"],
      answer: `<strong>دستورالعمل ذخیره‌سازی و بازخوانی حافظه در pH متر:</strong><br>
      - <strong>ذخیره داده:</strong> پس از پایدار شدن عدد اندازه‌گیری شده، کلید <strong>UP / A</strong> را فشار دهید. دستگاه تا ۲۵۶ داده را ذخیره می‌کند. در صورت پر شدن کامل حافظه، پیغام <code>OVER</code> نمایش داده می‌شود.<br>
      - <strong>بازخوانی داده‌ها:</strong> برای مرور مقادیر ذخیره‌شده، کلید <strong>DOWN / MR</strong> را بزنید. در صورت خالی بودن حافظه، پیغام <code>NONE</code> نمایش داده می‌شود.<br>
      - <strong>حذف داده‌ها:</strong> از منوی تنظیمات پیشرفته پارامتر <code>P06</code> را روی <code>YES</code> قرار داده و تایید کنید.`
    },
    {
      id: "ph_buffer_temp",
      keywords: ["تغییر بافر با دما", "بافر دمای مختلف", "جدول بافر", "تاثیر دما بر pH", "جبران دمایی", "atc pH"],
      answer: `<strong>تاثیر دما بر pH بافرهای استاندارد (استاندارد USA):</strong><br>
      تغییرات میزان pH بافرهای کالیبراسیون استاندارد در دماهای مختلف به دلیل جبران‌ساز دمایی (ATC) به شرح زیر است:<br>
      - <strong>دمای ۰ درجه:</strong> بافر اسیدی = <code>4.01</code> | بافر خنثی = <code>7.12</code> | بافر بازی = <code>10.32</code><br>
      - <strong>دمای ۲۵ درجه:</strong> بافر اسیدی = <code>4.00</code> | بافر خنثی = <code>7.00</code> | بافر بازی = <code>10.01</code><br>
      - <strong>دمای ۵۰ درجه:</strong> بافر اسیدی = <code>4.06</code> | بافر خنثی = <code>6.97</code> | بافر بازی = <code>9.83</code><br>
      در صورت وجود نشانگر <strong>ATC</strong> روی نمایشگر، جبران دمایی فعال است. در غیر این صورت (کلمه <strong>Manual</strong>) دما به صورت پیش‌فرض روی ۲۵ درجه سانتی‌گراد فرض می‌شود.`
    },
    {
      id: "oven_heating_status",
      keywords: ["زمان گرم شدن فور", "بوق پایان فور", "پیغام end.t", "پیغام end.e", "ریست کردن فور", "reset oven"],
      answer: `<strong>مراحل گرمادهی و کدهای وضعیت فور (Oven):</strong><br>
      - <strong>مدت زمان پیش‌گرمایش:</strong> پس از شروع، حدود ۳۰ الی ۱۲۰ دقیقه طول می‌کشد تا دستگاه به دمای تنظیم‌شده برسد. به محض رسیدن، دستگاه <strong>۳ بار بوق</strong> صوتی زده و زمان‌سنج معکوس به طور خودکار شروع می‌شود.<br>
      - <strong>کد End.t:</strong> نشان‌دهنده پایان موفق سیکل گرمایی طبق زمان‌بندی بدون بروز خطا می‌باشد.<br>
      - <strong>کد End.E:</strong> نشان‌دهنده توقف کارکرد دستگاه به دلیل خطاهای ناشی از قطعی برق یا نوسان ولتاژ بالا در طول چرخه گرمادهی است.<br>
      - <strong>تغییر پارامترها حین کار:</strong> پس از استارت پارامترها قفل می‌شوند. جهت تغییر آنها یا ریست دستگاه، ولوم تنظیم را <strong>بیش از ۳ ثانیه</strong> نگه دارید.`
    }
  ];

  // Welcome Messages and Suggestions
  const welcomeText = "سلام! من دستیار هوشمند آفلاین آزمایشگاه پسماند هستم. چطور می‌توانم به شما کمک کنم؟ شما می‌توانید درباره ایمنی، پسماندها، کالیبراسیون و خطاهای دستگاه‌ها یا مشخصات MSDS مواد شیمیایی (مانند استون، اسید سولفوریک، کلروفرم) از من بپرسید.";
  const suggestionList = [
    { text: "نحوه کالیبره کردن pH متر", query: "کالیبره کردن pH متر رومیزی" },
    { text: "رفع خطای E.H.t فور", query: "خطای E.H.t فور چیست" },
    { text: "MSDS اسید سولفوریک", query: "MSDS اسید سولفوریک" },
    { text: "قوانین دفع پسماند حلال‌ها", query: "قوانین دفع پسماند حلال ها و اسیدها" },
    { text: "فرمول شتاب سانتریفیوژ", query: "فرمول محاسبه شتاب سانتریفیوژ RCF" }
  ];

  const fallbackText = "متأسفانه پاسخ دقیق سوال شما را در مستندات آزمایشگاه پیدا نکردم. لطفاً سوال خود را ساده‌تر بپرسید (مثلاً: کالیبره کردن pH متر، خطاهای فور، ساعات کار آزمایشگاه) یا به تب‌های راهنمای سایت مراجعه کنید.";

  // Create UI Elements Dynamically
  function createChatbotUI() {
    // 1. Chat FAB Button
    const fab = document.createElement('button');
    fab.id = 'chatbot-fab';
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'دستیار هوشمند آزمایشگاه');
    fab.innerHTML = '<span class="material-symbols-outlined">forum</span>';
    document.body.appendChild(fab);

    // 2. Chat Window
    const win = document.createElement('div');
    win.id = 'chatbot-window';
    win.className = 'chatbot-window';
    win.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title">
          <span class="material-symbols-outlined bot-icon">smart_toy</span>
          <div>
            <h3>دستیار هوشمند آزمایشگاه</h3>
            <p>پاسخ‌گویی آفلاین بر اساس مستندات</p>
          </div>
        </div>
        <button id="chatbot-close" class="chatbot-close" aria-label="بستن پنجره">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div id="chatbot-messages" class="chatbot-messages"></div>
      <div class="chatbot-footer">
        <input type="text" id="chatbot-input" class="chatbot-input" placeholder="سوال خود را بپرسید...">
        <button id="chatbot-send" class="chatbot-send" aria-label="ارسال">
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    `;
    document.body.appendChild(win);
  }

  createChatbotUI();

  // Grab DOM Elements
  const chatbotFab = document.getElementById('chatbot-fab');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');

  let isInitialized = false;

  // Toggle Chatbot Window
  chatbotFab.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    chatbotFab.classList.toggle('active');
    
    if (chatbotWindow.classList.contains('active')) {
      chatbotInput.focus();
      if (!isInitialized) {
        initializeChat();
      }
    }
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotFab.classList.remove('active');
  });

  // Welcome message initialization
  function initializeChat() {
    isInitialized = true;
    addMessage(welcomeText, 'bot');
    
    // Add Suggestion Chips
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'chatbot-suggestions';
    
    suggestionList.forEach(s => {
      const chip = document.createElement('span');
      chip.className = 'suggestion-chip';
      chip.textContent = s.text;
      chip.addEventListener('click', () => {
        handleUserQuery(s.query);
      });
      suggestionsContainer.appendChild(chip);
    });
    
    chatbotMessages.appendChild(suggestionsContainer);
    scrollToBottom();
  }

  // Handle message sending
  function sendMessage() {
    const query = chatbotInput.value.trim();
    if (!query) return;
    
    chatbotInput.value = '';
    handleUserQuery(query);
  }

  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // NLP Matching Engine
  function handleUserQuery(query) {
    addMessage(query, 'user');
    
    // Show Bouncing Dots Bouncing Typing Indicator
    const typingIndicator = showTypingIndicator();
    
    setTimeout(() => {
      typingIndicator.remove();
      
      const response = searchKnowledgeBase(query);
      addMessage(response, 'bot');
      
      // Auto-render KaTeX if available
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(chatbotMessages, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      }
      
      scrollToBottom();
    }, 500); // 500ms delay to simulate bot thinking
  }

  // Calculate Levenshtein Distance between two strings
  function getLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1  // deletion
            )
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  // Calculate similarity ratio between 0 and 1
  function getStringSimilarity(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return 1.0;
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = getLevenshteinDistance(s1, s2);
    return 1.0 - (dist / maxLen);
  }

  const stopWords = new Set(['در', 'به', 'از', 'با', 'که', 'تا', 'و', 'یا', 'را']);

  function parseWords(text) {
    return text.toLowerCase()
      .replace(/[()]/g, "")
      .split(' ')
      .map(w => w.trim())
      .filter(w => w.length > 1 && !stopWords.has(w));
  }

  // Scoring-based chemical matching engine to prevent false matches on generic queries
  function getChemicalMatchScore(cleanQuery, chem) {
    const queryWords = parseWords(cleanQuery);
    if (queryWords.length === 0) return 0;

    const nameFaLower = chem.nameFa.toLowerCase();
    const nameEnLower = chem.nameEn.toLowerCase();
    const formulaLower = chem.formula.toLowerCase();
    const cas = chem.cas;

    // Exact matches (highest priority)
    if (cleanQuery === nameFaLower || cleanQuery === nameEnLower || cleanQuery === cas || cleanQuery === formulaLower) {
      return 100;
    }

    // Substring match
    if (cleanQuery.includes(nameFaLower) || cleanQuery.includes(nameEnLower)) {
      return 80 + (nameFaLower.length / cleanQuery.length) * 10;
    }

    const chemWordsFa = parseWords(nameFaLower);
    const chemWordsEn = parseWords(nameEnLower);

    const normalizedFormula = formulaLower.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, m => {
      const map = { '₀':'0', '₁':'1', '₂':'2', '₃':'3', '₄':'4', '₅':'5', '₆':'6', '₇':'7', '₈':'8', '₉':'9' };
      return map[m];
    });

    let matchedWordsCount = 0;
    let totalSimilarity = 0;

    for (const qWord of queryWords) {
      let isOrganicQueryWord = (qWord === 'آلی' || qWord === 'الی');
      let wordMaxSim = 0;

      // Formula similarity
      const formSim = getStringSimilarity(qWord, normalizedFormula);
      if (formSim >= 0.8) {
        wordMaxSim = Math.max(wordMaxSim, formSim);
      }

      // Persian components
      for (const cWord of chemWordsFa) {
        // Exclude organic keyword matching allyl/alizarin components
        if (isOrganicQueryWord && (cWord.startsWith('آلیل') || cWord.startsWith('الیل') || cWord.startsWith('آلیزار') || cWord.startsWith('الیزار'))) {
          continue;
        }
        const threshold = (cWord.length <= 3 || qWord.length <= 3) ? 0.85 : 0.75;
        const sim = getStringSimilarity(qWord, cWord);
        if (sim >= threshold) {
          wordMaxSim = Math.max(wordMaxSim, sim);
        }
      }

      // English components
      for (const cWord of chemWordsEn) {
        const threshold = (cWord.length <= 3 || qWord.length <= 3) ? 0.85 : 0.75;
        const sim = getStringSimilarity(qWord, cWord);
        if (sim >= threshold) {
          wordMaxSim = Math.max(wordMaxSim, sim);
        }
      }

      if (wordMaxSim > 0) {
        matchedWordsCount++;
        totalSimilarity += wordMaxSim;
      }
    }

    if (matchedWordsCount === 0) return 0;

    const avgSim = totalSimilarity / matchedWordsCount;
    const queryMatchRatio = matchedWordsCount / queryWords.length;
    const chemWordsCount = chemWordsFa.length || 1;
    const chemMatchRatio = matchedWordsCount / chemWordsCount;

    return (matchedWordsCount * 10) * queryMatchRatio * (0.5 + 0.5 * chemMatchRatio) * avgSim;
  }

  // Chemical MSDS search interceptor
  function searchMsdsDatabase(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const cleanQuery = normalizedQuery.replace(/[؟?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");

    if (!window.chemicalMsdsDb) return null;

    let bestChem = null;
    let maxScore = 0;

    for (const chem of window.chemicalMsdsDb) {
      const score = getChemicalMatchScore(cleanQuery, chem);
      if (score > maxScore) {
        maxScore = score;
        bestChem = chem;
      }
    }

    // Require a minimum match score threshold (4.5) to activate the MSDS card presentation
    if (maxScore >= 4.5 && bestChem) {
      let hazardsHtml = bestChem.hazards.map(h => 
        `<div style="display: flex; align-items: center; gap: 0.4rem; margin-top: 0.25rem;">
          <span class="material-symbols-outlined" style="color: var(--accent-red); font-size: 18px;">${h.icon}</span>
          <span>${h.label}</span>
        </div>`
      ).join('');

      let incompatibleHtml = bestChem.incompatible.map(inc => `<li>${inc}</li>`).join('');

      return `
        <div style="border-right: 4px solid var(--accent-red); padding-right: 0.75rem; margin-bottom: 0.5rem;">
          <strong style="font-size: 1rem; color: var(--text-primary);">${bestChem.nameFa} (${bestChem.nameEn})</strong><br>
          <span style="font-size: 0.8rem; color: var(--text-muted);">فرمول شیمیایی: <code>${bestChem.formula}</code> | کد CAS: <code>${bestChem.cas}</code></span>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
          <strong>دسته‌بندی پسماند:</strong> ${bestChem.wasteGroup}
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
          <strong>خطرات ایمنی:</strong>
          ${hazardsHtml}
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
          <strong>مواد ناسازگار (هرگز با هم مخلوط نشوند):</strong>
          <ul style="margin-right: 1.25rem; margin-top: 0.25rem; list-style-type: circle;">
            ${incompatibleHtml}
          </ul>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
          <strong>کمک‌های اولیه:</strong>
          <ul style="margin-right: 1.25rem; margin-top: 0.25rem; list-style-type: circle;">
            <li><strong>پوست:</strong> ${bestChem.firstAid.skin}</li>
            <li><strong>چشم:</strong> ${bestChem.firstAid.eyes}</li>
            ${bestChem.firstAid.inhalation ? `<li><strong>استنشاق:</strong> ${bestChem.firstAid.inhalation}</li>` : ''}
          </ul>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem;">
          <strong>نحوه جمع‌آوری و ریزش اضطراری:</strong> ${bestChem.spillAction}
        </div>
      `;
    }
    return null;
  }

  function searchKnowledgeBase(query) {
    // 1. Intercept for MSDS searches first
    const msdsResponse = searchMsdsDatabase(query);
    if (msdsResponse) {
      return msdsResponse;
    }

    // 2. Standard rule matching
    const normalizedQuery = query.toLowerCase().trim();
    const cleanQuery = normalizedQuery
      .replace(/[؟?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s+/g, " ");

    let bestMatch = null;
    let highestScore = 0;

    qaDatabase.forEach(item => {
      let score = 0;
      
      item.keywords.forEach(keyword => {
        if (cleanQuery.includes(keyword)) {
          score += 2;
        }
        
        const words = cleanQuery.split(' ').filter(w => w.length > 2);
        words.forEach(word => {
          if (keyword.includes(word)) {
            score += 0.5;
          }

          if (keyword.length > 2) {
            const sim = getStringSimilarity(word, keyword);
            if (sim >= 0.78) {
              score += sim * 1.5;
            }
          }
        });
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (highestScore >= 1.5 && bestMatch) {
      return bestMatch.answer;
    }
    
    return fallbackText;
  }

  // UI Helper Functions
  function addMessage(htmlContent, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = htmlContent;
    chatbotMessages.appendChild(msg);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatbotMessages.appendChild(indicator);
    scrollToBottom();
    return indicator;
  }

  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});
