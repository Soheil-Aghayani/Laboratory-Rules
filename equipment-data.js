(() => {
  const volumetricFlaskVariants = [
    ['25ml', '۲۵ میلی‌لیتر', '25 ml Volumetric Flask', 'volumetric-flask-25ml.webp'],
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Volumetric Flask', 'volumetric-flask-50ml.webp'],
    ['100ml', '۱۰۰ میلی‌لیتر', '100 ml Volumetric Flask', 'volumetric-flask-100ml.webp'],
    ['250ml', '۲۵۰ میلی‌لیتر', '250 ml Volumetric Flask', 'volumetric-flask-250ml.webp'],
    ['500ml', '۵۰۰ میلی‌لیتر', '500 ml Volumetric Flask', 'volumetric-flask-500ml.webp'],
    ['1000ml', '۱۰۰۰ میلی‌لیتر', '1000 ml Volumetric Flask', 'volumetric-flask-1000ml.webp']
  ].map(([id, label, titleEn, image]) => ({
    id,
    label,
    titleFa: `بالن حجمی ${label}`,
    titleEn,
    image,
    detail: `برای تهیهٔ محلول با حجم نهایی ${label}.`
  }));

  const reagentBottleVariants = [
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Reagent Bottle', 'GL32', 'برای نگهداری حجم‌های کم؛ در مدل مرجع Borosil با رزوهٔ GL32.'],
    ['100ml', '۱۰۰ میلی‌لیتر', '100 ml Reagent Bottle', 'GL45', 'بطری جمع‌وجور برای محلول‌ها و معرف‌های آماده؛ در مدل مرجع Borosil با رزوهٔ GL45.'],
    ['250ml', '۲۵۰ میلی‌لیتر', '250 ml Reagent Bottle', 'GL45', 'برای نگهداری روتین محلول‌ها؛ در مدل مرجع Borosil با رزوهٔ GL45.'],
    ['500ml', '۵۰۰ میلی‌لیتر', '500 ml Reagent Bottle', 'GL45', 'برای حجم‌های متوسط؛ در مدل مرجع Borosil با رزوهٔ GL45.'],
    ['1000ml', '۱۰۰۰ میلی‌لیتر', '1000 ml Reagent Bottle', 'GL45', 'برای نگهداری حجم‌های بالاتر؛ در مدل مرجع Borosil با رزوهٔ GL45.'],
    ['2000ml', '۲۰۰۰ میلی‌لیتر', '2000 ml Reagent Bottle', 'GL45', 'برای نگهداری حجم‌های بالاتر؛ در مدل مرجع Borosil با رزوهٔ GL45.']
  ].map(([id, label, titleEn, thread, detail]) => ({
    id,
    label,
    titleFa: `بطری معرف ${label}`,
    titleEn,
    image: 'reagent-bottles.webp',
    detail: `${detail} درپوش و ابعاد دقیق را با مدل انتخابی تطبیق دهید.`,
    metadata: { thread }
  }));

  const petriDishVariants = [
    ['50mm', '۵۰ میلی‌متر', '50 mm Borosilicate Petri Dish', '50 × 17 میلی‌متر'],
    ['80mm', '۸۰ میلی‌متر', '80 mm Borosilicate Petri Dish', '80 × 17 میلی‌متر'],
    ['100mm', '۱۰۰ میلی‌متر', '100 mm Borosilicate Petri Dish', '100 × 17 میلی‌متر'],
    ['150mm', '۱۵۰ میلی‌متر', '150 mm Borosilicate Petri Dish', '150 × 20 میلی‌متر'],
    ['200mm', '۲۰۰ میلی‌متر', '200 mm Borosilicate Petri Dish', '200 × 20 میلی‌متر']
  ].map(([id, label, titleEn, dimensions]) => ({
    id,
    label,
    titleFa: `پتری‌دیش ${label}`,
    titleEn,
    image: 'petri-dishes.webp',
    detail: `مدل مرجع Borosil 3160 با ابعاد تقریبی ${dimensions}؛ جنس بوروسیلیکات و قابلیت استریل‌سازی را با مدل نهایی تطبیق دهید.`,
    metadata: { dimensions, model: '3160' }
  }));

  const serologicalPipetteVariants = [
    ['0_1ml', '۰٫۱ میلی‌لیتر', '0.1 ml Glass Serological Pipette'],
    ['0_2ml', '۰٫۲ میلی‌لیتر', '0.2 ml Glass Serological Pipette'],
    ['1ml', '۱ میلی‌لیتر', '1 ml Glass Serological Pipette'],
    ['2ml', '۲ میلی‌لیتر', '2 ml Glass Serological Pipette'],
    ['5ml', '۵ میلی‌لیتر', '5 ml Glass Serological Pipette'],
    ['10ml', '۱۰ میلی‌لیتر', '10 ml Glass Serological Pipette'],
    ['25ml', '۲۵ میلی‌لیتر', '25 ml Glass Serological Pipette']
  ].map(([id, label, titleEn]) => ({
    id,
    label,
    titleFa: `پیپت سرولوژیک ${label}`,
    titleEn,
    image: 'serological-pipettes.webp',
    detail: `ظرفیت ${label} در سری مرجع Borosil 7081/7080 عرضه شده است؛ کلاس دقت و روش کالیبراسیون را با مدل نهایی بررسی کنید.`
  }));

  const buretteVariants = [
    ['5ml', '۵ میلی‌لیتر', '5 ml Straight Bore Glass Burette'],
    ['10ml', '۱۰ میلی‌لیتر', '10 ml Straight Bore Glass Burette'],
    ['25ml', '۲۵ میلی‌لیتر', '25 ml Straight Bore Glass Burette'],
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Straight Bore Glass Burette'],
    ['100ml', '۱۰۰ میلی‌لیتر', '100 ml Straight Bore Glass Burette']
  ].map(([id, label, titleEn]) => ({
    id,
    label,
    titleFa: `بورت ${label}`,
    titleEn,
    image: 'glass-burette.webp',
    detail: `مدل مرجع Borosil 2123 با ظرفیت ${label}، درجه‌بندی و تلرانس مخصوص همان ظرفیت را دارد.`
  }));

  const separatingFunnelVariants = [
    ['125ml', '۱۲۵ میلی‌لیتر', '125 ml Pear-Shaped Separating Funnel', '۱۹/۲۶'],
    ['250ml', '۲۵۰ میلی‌لیتر', '250 ml Pear-Shaped Separating Funnel', '۲۴/۲۹'],
    ['500ml', '۵۰۰ میلی‌لیتر', '500 ml Pear-Shaped Separating Funnel', '۲۴/۲۹'],
    ['1000ml', '۱۰۰۰ میلی‌لیتر', '1000 ml Pear-Shaped Separating Funnel', '۲۹/۳۲'],
    ['2000ml', '۲۰۰۰ میلی‌لیتر', '2000 ml Pear-Shaped Separating Funnel', '۲۹/۳۲'],
    ['5000ml', '۵۰۰۰ میلی‌لیتر', '5000 ml Pear-Shaped Separating Funnel', '۳۴/۳۵']
  ].map(([id, label, titleEn, stopper]) => ({
    id,
    label,
    titleFa: `قیف جداکننده ${label}`,
    titleEn,
    image: 'separating-funnel.webp',
    detail: `مدل مرجع Borosil 6403 با درپوش استاندارد ${stopper} برای این ظرفیت فهرست شده است؛ نوع شیر و اتصال را با مدل نهایی تطبیق دهید.`,
    metadata: { stopper }
  }));

  const watchGlassVariants = [
    ['80mm', '۸۰ میلی‌متر', '80 mm Watch Glass'],
    ['100mm', '۱۰۰ میلی‌متر', '100 mm Watch Glass'],
    ['120mm', '۱۲۰ میلی‌متر', '120 mm Watch Glass'],
    ['150mm', '۱۵۰ میلی‌متر', '150 mm Watch Glass']
  ].map(([id, label, titleEn]) => ({
    id,
    label,
    titleFa: `شیشهٔ ساعت ${label}`,
    titleEn,
    image: 'watch-glass.webp',
    detail: `قطر ${label} در سری مرجع Borosil 9986 S-Line عرضه شده است؛ جنس سودا-لایم و شعاع انحنا به مدل مربوط است.`
  }));

  const testTubeVariants = [
    ['5ml', '۵ میلی‌لیتر', '5 ml Glass Test Tube with Screw Cap', '۱۰۰ میلی‌متر'],
    ['10ml', '۱۰ میلی‌لیتر', '10 ml Glass Test Tube with Screw Cap', '۱۰۰ میلی‌متر'],
    ['15ml', '۱۵ میلی‌لیتر', '15 ml Glass Test Tube with Screw Cap', '۱۲۵ میلی‌متر'],
    ['20ml', '۲۰ میلی‌لیتر', '20 ml Glass Test Tube with Screw Cap', '۱۵۰ میلی‌متر'],
    ['30ml', '۳۰ میلی‌لیتر', '30 ml Glass Test Tube with Screw Cap', '۱۰۰ میلی‌متر'],
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Glass Test Tube with Screw Cap', '۱۵۰ میلی‌متر']
  ].map(([id, label, titleEn, length]) => ({
    id,
    label,
    titleFa: `لولهٔ آزمایش ${label}`,
    titleEn,
    image: 'screw-cap-test-tube.webp',
    detail: `گزینهٔ ${label} با طول تقریبی ${length} در مجموعهٔ Eisco با درپوش Bakelite و لاینر لاستیکی عرضه شده است.`,
    metadata: { length }
  }));

  const crystallizingDishVariants = [
    ['330ml', '۳۳۰ میلی‌لیتر', '330 ml Crystallizing Dish', '۱۰۰ × ۵۰ میلی‌متر'],
    ['1150ml', '۱۱۵۰ میلی‌لیتر', '1150 ml Crystallizing Dish', '۱۵۰ × ۷۵ میلی‌متر'],
    ['2500ml', '۲۵۰۰ میلی‌لیتر', '2500 ml Crystallizing Dish', '۱۹۰ × ۱۰۰ میلی‌متر']
  ].map(([id, label, titleEn, dimensions]) => ({
    id,
    label,
    titleFa: `ظرف تبلور ${label}`,
    titleEn,
    image: 'crystallizing-dish.webp',
    detail: `مدل مرجع Borosil 3140 با ظرفیت تقریبی ${label} و ابعاد ${dimensions} معرفی شده است.`,
    metadata: { dimensions }
  }));

  const porcelainCrucibleVariants = [
    ['10ml', '۱۰ میلی‌لیتر', '10 ml Porcelain Crucible'],
    ['17ml', '۱۷ میلی‌لیتر', '17 ml Porcelain Crucible'],
    ['30ml', '۳۰ میلی‌لیتر', '30 ml Porcelain Crucible'],
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Porcelain Crucible'],
    ['100ml', '۱۰۰ میلی‌لیتر', '100 ml Porcelain Crucible']
  ].map(([id, label, titleEn]) => ({
    id,
    label,
    titleFa: `بوتهٔ چینی ${label}`,
    titleEn,
    image: 'porcelain-crucible.webp',
    detail: `گزینهٔ ${label} در مجموعهٔ Eisco با فرم کوتاه و درپوش عرضه شده است؛ حداکثر دما و نرخ گرم‌وسردشدن را با مدل نهایی تطبیق دهید.`
  }));

  const bufferVariants = [
    ['ph4', 'pH ۴', 'pH 4 Buffer Solution', 'buffer-ph4.webp', 'مناسب برای کنترل اندازه‌گیری در محدودهٔ اسیدی.'],
    ['ph7', 'pH ۷', 'pH 7 Buffer Solution', 'buffer-ph7.webp', 'مناسب برای کنترل اندازه‌گیری نزدیک به نقطهٔ خنثی.'],
    ['ph10', 'pH ۱۰', 'pH 10 Buffer Solution', 'buffer-ph10.webp', 'مناسب برای کنترل اندازه‌گیری در محدودهٔ بازی.']
  ].map(([id, label, titleEn, image, detail]) => ({
    id,
    label,
    titleFa: `محلول بافر ${label}`,
    titleEn,
    image,
    detail
  }));

  const silicaGelVariants = [
    ['blue-dry', 'آبی خشک', 'Blue Silica Gel, Dry', 'silica-gel-blue-dry.webp', 'نمونهٔ سیلیکاژل آبی در حالت خشک؛ دانه‌ها آمادهٔ جذب رطوبت‌اند.', 'blue', 'dry'],
    ['blue-wet', 'آبی مرطوب', 'Blue Silica Gel, Wet', 'silica-gel-blue-wet.webp', 'نمونهٔ سیلیکاژل آبی پس از جذب رطوبت؛ تغییر رنگ شاخص به فرمول محصول وابسته است.', 'blue', 'wet'],
    ['orange-dry', 'نارنجی خشک', 'Orange Silica Gel, Dry', 'silica-gel-yellow-dry.webp', 'نمونهٔ سیلیکاژل نارنجی در حالت خشک؛ دانه‌ها آمادهٔ جذب رطوبت‌اند.', 'orange', 'dry'],
    ['orange-wet', 'نارنجی مرطوب', 'Orange Silica Gel, Wet', 'silica-gel-yellow-wet.webp', 'نمونهٔ سیلیکاژل نارنجی پس از جذب رطوبت؛ تغییر رنگ شاخص به فرمول محصول وابسته است.', 'orange', 'wet']
  ].map(([id, label, titleEn, image, detail, color, state]) => ({
    id,
    label,
    titleFa: `سیلیکاژل ${label}`,
    titleEn,
    image,
    detail,
    metadata: { color, state }
  }));

  const longStemFunnelVariants = [
    ['50mm', '۵۰ میلی‌متر', '50 mm Plain Long Narrow Stem Funnel', '۸ میلی‌متر', '۱۹٫۳ سانتی‌متر', '10326A'],
    ['65mm', '۶۵ میلی‌متر', '65 mm Plain Long Narrow Stem Funnel', '۸ میلی‌متر', '۲۰٫۶ سانتی‌متر', '10326B'],
    ['75mm', '۷۵ میلی‌متر', '75 mm Plain Long Narrow Stem Funnel', '۸ میلی‌متر', '۲۱٫۴ سانتی‌متر', '10326C'],
    ['100mm', '۱۰۰ میلی‌متر', '100 mm Plain Long Narrow Stem Funnel', '۹ میلی‌متر', '۲۳٫۶ سانتی‌متر', '10326D']
  ].map(([id, label, titleEn, stemDiameter, height, model]) => ({
    id,
    label,
    titleFa: `قیف ساقه‌بلند ${label}`,
    titleEn,
    image: 'glass-funnel-long-stem.webp',
    detail: `مدل مرجع Corning PYREX ${model} با ساقهٔ حدود ۱۵ سانتی‌متر، قطر ساقهٔ ${stemDiameter} و ارتفاع تقریبی ${height}.`,
    metadata: { stemDiameter, height, model }
  }));

  const buchnerFunnelVariants = [
    ['87ml', '۸۷ میلی‌لیتر', '87 ml Porcelain Buchner Funnel', 'FB966C', '۵۰ تا ۵۵ میلی‌متر', '۵۶ میلی‌متر'],
    ['186ml', '۱۸۶ میلی‌لیتر', '186 ml Porcelain Buchner Funnel', 'FB966D', '۷۰ میلی‌متر', '۸۳ میلی‌متر'],
    ['320ml', '۳۲۰ میلی‌لیتر', '320 ml Porcelain Buchner Funnel', 'FB966F', '۹۰ میلی‌متر', '۱۰۰ میلی‌متر'],
    ['550ml', '۵۵۰ میلی‌لیتر', '550 ml Porcelain Buchner Funnel', 'FB966G', '۱۱۰ میلی‌متر', '۱۱۴ میلی‌متر'],
    ['1860ml', '۱۸۶۰ میلی‌لیتر', '1860 ml Porcelain Buchner Funnel', 'FB966K', '۱۸۵ میلی‌متر', '۱۸۶ میلی‌متر']
  ].map(([id, label, titleEn, model, discDiameter, plateDiameter]) => ({
    id,
    label,
    titleFa: `قیف بوخنر ${label}`,
    titleEn,
    image: 'buchner-funnel.webp',
    detail: `مدل مرجع Fisherbrand ${model} با صفحهٔ سوراخ‌دار ثابت، قطر دیسک ${discDiameter} و قطر صفحهٔ ${plateDiameter}.`,
    metadata: { model, discDiameter, plateDiameter }
  }));

  const porcelainMortarPestleVariants = [
    ['50ml', '۵۰ میلی‌لیتر', '50 ml Porcelain Mortar and Pestle', 'JMD050', '۹۵ میلی‌متر'],
    ['70ml', '۷۰ میلی‌لیتر', '70 ml Porcelain Mortar and Pestle', 'JMD070', '۱۱۵ میلی‌متر'],
    ['150ml', '۱۵۰ میلی‌لیتر', '150 ml Porcelain Mortar and Pestle', 'JMD150', '۱۳۵ میلی‌متر'],
    ['275ml', '۲۷۵ میلی‌لیتر', '275 ml Porcelain Mortar and Pestle', 'JMD275', '۱۶۰ میلی‌متر'],
    ['400ml', '۴۰۰ میلی‌لیتر', '400 ml Porcelain Mortar and Pestle', 'JMD400', '۱۸۵ میلی‌متر'],
    ['750ml', '۷۵۰ میلی‌لیتر', '750 ml Porcelain Mortar and Pestle', 'JMD750', '۲۰۰ میلی‌متر'],
    ['1900ml', '۱۹۰۰ میلی‌لیتر', '1900 ml Porcelain Mortar and Pestle', 'JMD1900', '۲۲۲ میلی‌متر']
  ].map(([id, label, titleEn, model, pestleLength]) => ({
    id,
    label,
    titleFa: `هاون چینی ${label}`,
    titleEn,
    image: 'porcelain-mortar-pestle.webp',
    detail: `مدل مرجع ${model} با دستهٔ هاون حدود ${pestleLength}؛ سطح آسیاب‌کردن باید پیش از کار تمیز و سالم باشد.`,
    metadata: { model, pestleLength }
  }));

  const crucibleTongVariants = [
    ['9in', '۹ اینچ', '9 in Stainless Steel Crucible Tongs', '15-186', '۲۳ سانتی‌متر'],
    ['18in', '۱۸ اینچ', '18 in Jumbo Crucible Tongs', '15-207', '۴۶ سانتی‌متر'],
    ['24in', '۲۴ اینچ', '24 in Stainless Steel Crucible Tongs', '13820020', '۶۱ سانتی‌متر']
  ].map(([id, label, titleEn, model, length]) => ({
    id,
    label,
    titleFa: `انبر بوته ${label}`,
    titleEn,
    image: 'crucible-tongs.webp',
    detail: `مدل مرجع ${model} با طول تقریبی ${length} برای جابه‌جایی ظروف داغ؛ پایداری فک‌ها و وزن ظرف را پیش از بلندکردن بررسی کنید.`,
    metadata: { model, length }
  }));

  const vacuumDesiccatorVariants = [
    ['100mm', 'قطر ۱۰۰', '100 mm Clear Vacuum Desiccator', '3083041', '۱۵۳ × ۱۷۳ میلی‌متر'],
    ['150mm', 'قطر ۱۵۰', '150 mm Clear Vacuum Desiccator', '3083042', '۲۱۳ × ۲۰۵ میلی‌متر'],
    ['200mm', 'قطر ۲۰۰', '200 mm Clear Vacuum Desiccator', '3083043', '۲۷۲ × ۲۷۲ میلی‌متر'],
    ['250mm', 'قطر ۲۵۰', '250 mm Clear Vacuum Desiccator', '3083044', '۳۳۳ × ۳۲۳ میلی‌متر'],
    ['300mm', 'قطر ۳۰۰', '300 mm Clear Vacuum Desiccator', '3083045', '۳۹۵ × ۳۴۴ میلی‌متر']
  ].map(([id, label, titleEn, model, dimensions]) => ({
    id,
    label,
    titleFa: `دسیکاتور خلأ ${label} میلی‌متر`,
    titleEn,
    image: 'vacuum-desiccator.webp',
    detail: `مدل مرجع Borosil 3083 با قطر اسمی ${label.replace('قطر ', '')} میلی‌متر و ابعاد تقریبی فلنج و ارتفاع ${dimensions}.`,
    metadata: { model, dimensions }
  }));

  const coiledDistillateVariants = [
    ['300mm', '۳۰۰ میلی‌متر', '300 mm Graham Coiled Condenser', '2560090', '۴۵۰ میلی‌متر'],
    ['400mm', '۴۰۰ میلی‌متر', '400 mm Graham Coiled Condenser', '2560092', '۵۵۰ میلی‌متر'],
    ['500mm', '۵۰۰ میلی‌متر', '500 mm Graham Coiled Condenser', '2560095', '۶۵۰ میلی‌متر']
  ].map(([id, label, titleEn, model, overallHeight]) => ({
    id,
    label,
    titleFa: `کندانسور مارپیچی ${label}`,
    titleEn,
    image: 'coiled-distillate.webp',
    detail: `مدل مرجع Borosil 2560 با طول ژاکت ${label} و ارتفاع کلی تقریبی ${overallHeight}، با اتصال استاندارد ۲۴/۲۹.`,
    metadata: { model, overallHeight, joint: '۲۴/۲۹' }
  }));

  const pipetteStandVariants = [
    ['6-manual-3-electronic', '۶ دستی یا ۳ الکترونیکی', 'Carousel Stand for 6 Manual or 3 Electronic Pipettes', '21377002'],
    ['8-single-4-multi', '۸ تک‌کاناله یا ۴ چندکاناله', 'Universal Carousel Stand for 8 Single or 4 Multi-channel Pipettes', '01670456'],
    ['6-rotary', '۹۴ پیپت', '94-Position Rotary Pipette Stand', '03410507'],
    ['6-eppendorf', '۶ پیپت', 'Carousel Stand for 6 Manual Pipettes', '3116000015']
  ].map(([id, label, titleEn, model]) => ({
    id,
    label,
    titleFa: `پایهٔ پیپت ${label}`,
    titleEn,
    image: 'pipette-stand.webp',
    detail: `گزینهٔ مرجع با کد ${model}؛ ظرفیت اعلام‌شده را پیش از خرید با نوع پیپت‌های آزمایشگاه تطبیق دهید.`,
    metadata: { model }
  }));

  const allihnCondenserVariants = [
    ['200mm', '۲۰۰ میلی‌متر', '200 mm Allihn Condenser', '2480087', '۳۵۰ میلی‌متر', '۱۹/۲۶'],
    ['300mm', '۳۰۰ میلی‌متر', '300 mm Allihn Condenser', '2480090', '۴۵۰ میلی‌متر', '۲۴/۲۹'],
    ['400mm', '۴۰۰ میلی‌متر', '400 mm Allihn Condenser', '2480092', '۵۵۰ میلی‌متر', '۲۴/۲۹'],
    ['600mm', '۶۰۰ میلی‌متر', '600 mm Allihn Condenser', '2480096', '۷۵۰ میلی‌متر', '۲۹/۳۲']
  ].map(([id, label, titleEn, model, overallHeight, joint]) => ({
    id,
    label,
    titleFa: `کندانسور آلیهن ${label}`,
    titleEn,
    image: 'allihn-condenser.webp',
    detail: `مدل مرجع Borosil 2480 با ارتفاع کلی تقریبی ${overallHeight} و اتصال ${joint}.`,
    metadata: { model, overallHeight, joint }
  }));

  const catalog = [
    {
      slug: 'volumetric-flasks',
      titleFa: 'بالن‌های حجمی',
      titleEn: 'Volumetric Flasks',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای تهیهٔ محلول با حجم نهایی مشخص، در اندازه‌های مختلف.',
      introduction: 'بالن حجمی برای رساندن حجم محلول به مقدار مشخص استفاده می‌شود. شکل و خط نشانهٔ آن برای تنظیم حجم نهایی طراحی شده است.',
      primaryUse: 'تهیهٔ محلول‌های استاندارد و رقیق‌سازی دقیق',
      safety: 'پیش از استفاده سلامت شیشه و درپوش را بررسی کنید و از گرمادهی مستقیم خودداری کنید.',
      details: ['حجم را تا خط نشانه و در دمای مرجع تنظیم کنید.', 'برای خواندن حجم، منیسک را هم‌سطح چشم قرار دهید.', 'برای هر کار، حجم مناسب را بر اساس مقدار نهایی محلول انتخاب کنید.'],
      source: 'https://www.interlab.co.nz/product/volumetric-flasks-clear-glass/',
      variants: volumetricFlaskVariants
    },
    {
      slug: 'reagent-bottles',
      titleFa: 'بطری‌های نگهداری معرف',
      titleEn: 'Reagent Bottles',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای نگهداری، شناسایی و دسترسی ایمن به محلول‌ها.',
      introduction: 'بطری معرف، محل مناسبی برای نگهداری موقت یا روتین محلول‌ها و مواد شیمیایی سازگار با شیشه است. انتخاب درپوش و برچسب‌گذاری صحیح به کاهش خطا کمک می‌کند.',
      primaryUse: 'نگهداری محلول‌ها و معرف‌های آماده‌شده',
      safety: 'نام ماده، غلظت، تاریخ آماده‌سازی و هشدارهای لازم باید روی برچسب ثبت شود.',
      details: ['سازگاری ماده با شیشه و درپوش را بررسی کنید.', 'بطری را بیش از ظرفیت مفید پر نکنید.', 'مواد ناسازگار را در یک بطری یا سینی مشترک قرار ندهید.'],
      variants: reagentBottleVariants
    },
    {
      slug: 'petri-dishes',
      titleFa: 'پتری‌دیش شیشه‌ای',
      titleEn: 'Petri Dishes',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'ظرف کم‌عمق برای مشاهده، نگهداری یا آماده‌سازی نمونه.',
      introduction: 'پتری‌دیش شیشه‌ای برای کار با نمونه‌های کم‌حجم، مشاهدهٔ سطح و آماده‌سازی ساده استفاده می‌شود. سطح صاف آن باید تمیز و عاری از ترک باشد.',
      primaryUse: 'نگهداری یا مشاهدهٔ نمونه‌های کم‌حجم',
      safety: 'پیش از استفاده، تمیزی و سلامت سطح شیشه بررسی شود.',
      details: ['پوشش را هنگام جابه‌جایی آرام نگه دارید.', 'نمونه‌های ناشناخته را بدون برچسب رها نکنید.', 'پس از استفاده، ظرف را طبق روش پاک‌سازی آزمایشگاه تمیز کنید.'],
      variants: petriDishVariants
    },
    {
      slug: 'porcelain-crucible',
      titleFa: 'بوتهٔ چینی متوسط',
      titleEn: 'Porcelain Crucible',
      category: 'porcelain',
      categoryLabel: 'چینی',
      summary: 'برای گرمادهی و عملیات حرارتی نمونه‌های جامد.',
      introduction: 'بوتهٔ چینی برای گرمادهی کنترل‌شده، خشک‌کردن یا عملیات حرارتی نمونه‌های جامد به کار می‌رود. پیش از کار، سازگاری ماده و برنامهٔ حرارتی را بررسی کنید.',
      primaryUse: 'گرمادهی و عملیات حرارتی نمونه‌های جامد',
      safety: 'پس از گرمادهی، بوته را با ابزار مناسب جابه‌جا و تا رسیدن به دمای ایمن خنک کنید.',
      details: ['بوتهٔ داغ را روی سطح مقاوم به حرارت قرار دهید.', 'از شوک حرارتی و تماس ناگهانی با سطح سرد خودداری کنید.', 'برای وزن‌کشی، اجازه دهید بوته در دسیکاتور خنک شود.'],
      variants: porcelainCrucibleVariants
    },
    {
      slug: 'glass-funnel-long-stem',
      titleFa: 'قیف شیشه‌ای ساقه‌بلند',
      titleEn: 'Long Stem Glass Funnel',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای انتقال کنترل‌شدهٔ مایعات یا فیلتراسیون ساده.',
      introduction: 'قیف ساقه‌بلند انتقال مایع به دهانه‌های باریک را ساده می‌کند و در صورت استفاده از کاغذ صافی، برای فیلتراسیون ثقلی نیز کاربرد دارد.',
      primaryUse: 'انتقال مایع و فیلتراسیون ثقلی',
      safety: 'پیش از کار، سازگاری شیشه و کاغذ یا محیط فیلتراسیون بررسی شود.',
      details: ['قیف را با تکیه‌گاه مناسب ثابت کنید.', 'برای جلوگیری از سرریز، جریان را آهسته و کنترل‌شده نگه دارید.', 'پیش از استفاده، نوک ساقه را از نظر لب‌پریدگی بررسی کنید.'],
      variants: longStemFunnelVariants
    },
    {
      slug: 'serological-pipettes',
      titleFa: 'پیپت سرولوژیک شیشه‌ای',
      titleEn: 'Glass Serological Pipette',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای انتقال و اندازه‌گیری حجم مایعات.',
      introduction: 'پیپت سرولوژیک برای انتقال حجمی مایعات با کمک پوآر یا پیپت‌فیلر استفاده می‌شود. خواندن منیسک و انتخاب روش مکش مناسب برای کار دقیق مهم است.',
      primaryUse: 'انتقال اندازه‌گیری‌شدهٔ مایعات',
      safety: 'برای پیپت‌کردن از پوآر یا پیپت‌فیلر استفاده کنید و هرگز با دهان مکش نکنید.',
      details: ['پیش از کار، کالیبراسیون و سلامت نوک را بررسی کنید.', 'پیپت را پس از استفاده در محل مشخص قرار دهید.', 'برای مواد زیستی یا خورنده، روش دفع مناسب را رعایت کنید.'],
      variants: serologicalPipetteVariants
    },
    {
      slug: 'watch-glass',
      titleFa: 'شیشهٔ ساعت',
      titleEn: 'Watch Glass',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای پوشاندن ظرف، تبخیر محدود یا نگهداری کوتاه‌مدت نمونه.',
      introduction: 'شیشهٔ ساعت یک سطح شیشه‌ای کم‌عمق و چندمنظوره است که می‌تواند به عنوان پوشش ظرف، سطح تبخیر محدود یا محل نگهداری کوتاه‌مدت نمونه استفاده شود.',
      primaryUse: 'پوشاندن ظروف و تبخیر محدود',
      safety: 'سطح شیشه را پیش از استفاده از آلودگی و ترک بررسی کنید.',
      details: ['برای جابه‌جایی از لبه‌ها استفاده کنید.', 'برای گرمادهی مستقیم، روش آزمایش را بررسی کنید.', 'نمونهٔ باقی‌مانده را پس از کار طبق دستورالعمل دفع کنید.'],
      variants: watchGlassVariants
    },
    {
      slug: 'glass-burette',
      titleFa: 'بورت شیشه‌ای مدرج',
      titleEn: 'Straight Bore Glass Burette',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای افزودن کنترل‌شدهٔ حجم مایع در اندازه‌گیری‌های حجمی.',
      introduction: 'بورت شیشه‌ای برای افزودن تدریجی و ثبت حجم مایع، به‌ویژه در تیتر کردن، به کار می‌رود. وضعیت شیر و نبود حباب در مسیر برای خوانش قابل اعتماد مهم است.',
      primaryUse: 'تیتر کردن و افزودن دقیق مایع',
      safety: 'پیش از استفاده، نشتی شیر و خوانش منیسک بررسی شود.',
      details: ['بورت را عمودی و با گیرهٔ مناسب نصب کنید.', 'پیش از شروع، مسیر را با محلول آماده و حباب‌زدایی کنید.', 'محلول باقی‌مانده را در ظرف پسماند مناسب جمع کنید.'],
      variants: buretteVariants
    },
    {
      slug: 'separating-funnel',
      titleFa: 'قیف جداکنندهٔ گلابی‌شکل',
      titleEn: 'Pear-Shaped Separating Funnel',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای جداسازی فازهای مایع غیرقابل اختلاط.',
      introduction: 'قیف جداکننده برای تفکیک دو فاز مایع غیرقابل اختلاط استفاده می‌شود. ترتیب لایه‌ها و فشار احتمالی داخل قیف باید پیش از تخلیه ارزیابی شود.',
      primaryUse: 'جداسازی فازهای مایع',
      safety: 'پیش از بازکردن شیر یا درپوش، فشار داخل قیف را طبق روش ایمن آزاد کنید.',
      details: ['پیش از تکان‌دادن، درپوش را محکم اما قابل بازشدن ببندید.', 'قیف را دور از صورت و بدن نگه دارید.', 'هر فاز را در ظرفی با برچسب روشن جمع‌آوری کنید.'],
      variants: separatingFunnelVariants
    },
    {
      slug: 'buchner-funnel',
      titleFa: 'قیف بوخنر چینی',
      titleEn: 'Porcelain Buchner Funnel',
      category: 'porcelain',
      categoryLabel: 'چینی',
      summary: 'برای فیلتراسیون خلأ همراه با کاغذ صافی.',
      introduction: 'قیف بوخنر چینی در فیلتراسیون خلأ برای جداسازی جامد از مایع به کار می‌رود. آب‌بندی مناسب و انتخاب کاغذ صافی برای عملکرد درست ضروری است.',
      primaryUse: 'فیلتراسیون خلأ',
      safety: 'اتصال، کاغذ صافی و سلامت شیشه یا بالن خلأ را قبل از کار بررسی کنید.',
      details: ['کاغذ صافی را با اندازهٔ مناسب انتخاب و مرطوب کنید.', 'خلأ را به‌آرامی برقرار کنید.', 'ظروف خلأ را از نظر ترک و لب‌پریدگی بررسی کنید.'],
      variants: buchnerFunnelVariants
    },
    {
      slug: 'porcelain-mortar-pestle',
      titleFa: 'هاون و دستهٔ هاون چینی',
      titleEn: 'Glazed Porcelain Mortar and Pestle',
      category: 'porcelain',
      categoryLabel: 'چینی',
      summary: 'برای خردکردن یا همگن‌سازی نمونه‌های جامد.',
      introduction: 'هاون و دستهٔ هاون چینی برای خردکردن، مخلوط‌کردن یا همگن‌سازی مقدارهای کوچک از مواد جامد استفاده می‌شود. فشار یکنواخت، خطر پاشش و گردوغبار را کاهش می‌دهد.',
      primaryUse: 'خردکردن و همگن‌سازی جامدات',
      safety: 'از ضربهٔ شدید و ترکیب موادی که واکنش آن‌ها مشخص نیست خودداری کنید.',
      details: ['در صورت تولید گردوغبار، داخل هود کار کنید.', 'سطح داخلی را پس از هر ماده تمیز کنید.', 'مواد واکنش‌پذیر را بدون بررسی سازگاری با هم آسیاب نکنید.'],
      variants: porcelainMortarPestleVariants
    },
    {
      slug: 'screw-cap-test-tube',
      titleFa: 'لولهٔ آزمایش درپیچ‌دار',
      titleEn: 'Glass Test Tube with Screw Cap',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای نگهداری یا آماده‌سازی حجم‌های کم نمونه.',
      introduction: 'لولهٔ آزمایش درپیچ‌دار برای نگهداری کوتاه‌مدت یا آماده‌سازی نمونه‌های کم‌حجم مناسب است. درپوش باید متناسب با شرایط ماده و فشار احتمالی انتخاب شود.',
      primaryUse: 'نگهداری و آماده‌سازی نمونه‌های کم‌حجم',
      safety: 'درپوش را بیش از حد سفت نکنید و پیش از گرمادهی، بسته‌بودن کامل را بررسی کنید.',
      details: ['برای گرمادهی در ظرف بسته از آن استفاده نکنید.', 'سطح بیرونی را پیش از قرار دادن در رک خشک کنید.', 'نمونه را با نام و تاریخ مشخص برچسب بزنید.'],
      variants: testTubeVariants
    },
    {
      slug: 'crucible-tongs',
      titleFa: 'انبر بوته از فولاد زنگ‌نزن',
      titleEn: 'Stainless Steel Crucible Tongs',
      category: 'metal',
      categoryLabel: 'فلزی',
      summary: 'برای گرفتن بوته‌ها و ظروف داغ در فاصلهٔ ایمن.',
      introduction: 'انبر بوته امکان جابه‌جایی کنترل‌شدهٔ بوته و ظروف داغ را فراهم می‌کند. شکل گرفتن و جنس ابزار باید با وزن و دمای ظرف سازگار باشد.',
      primaryUse: 'جابه‌جایی ظروف داغ',
      safety: 'پیش از جابه‌جایی، ظرفیت و پایداری گرفتن انبر را بررسی کنید.',
      details: ['ظرف را از مرکز و با فشار یکنواخت بگیرید.', 'مسیر انتقال را از قبل خالی کنید.', 'پس از استفاده، ابزار را روی سطح مقاوم به حرارت قرار دهید.'],
      variants: crucibleTongVariants
    },
    {
      slug: 'crystallizing-dish',
      titleFa: 'ظرف تبلور',
      titleEn: 'Crystallizing Dish',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای تبخیر کنترل‌شده و تشکیل بلور از محلول.',
      introduction: 'ظرف تبلور سطح وسیعی برای تبخیر کنترل‌شده و شکل‌گیری بلور فراهم می‌کند. سرعت تبخیر و دما باید با ماهیت محلول و هدف آزمایش هماهنگ باشد.',
      primaryUse: 'تبخیر کنترل‌شده و تشکیل بلور',
      safety: 'ظرف را روی سطح پایدار قرار دهید و از پرکردن بیش از ظرفیت خودداری کنید.',
      details: ['برای کاهش پاشش، محلول را آرام گرم کنید.', 'ظرف را هنگام جابه‌جایی از دو طرف نگه دارید.', 'بلورها و محلول مادر را در ظرف‌های برچسب‌دار نگهداری کنید.'],
      variants: crystallizingDishVariants
    },
    {
      slug: 'vacuum-desiccator',
      titleFa: 'دسیکاتور خلأ شیشه‌ای',
      titleEn: 'Glass Vacuum Desiccator',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای خشک‌کردن یا نگهداری نمونه در محیط کم‌رطوبت.',
      introduction: 'دسیکاتور خلأ برای کاهش تماس نمونه با رطوبت و کمک به خشک‌کردن پس از گرمادهی استفاده می‌شود. سلامت بدنه و آب‌بندی باید پیش از ایجاد خلأ بررسی شود.',
      primaryUse: 'خشک‌کردن و نگهداری کم‌رطوبت',
      safety: 'پیش از ایجاد خلأ، سلامت بدنه، درپوش و گریس آب‌بندی بررسی شود.',
      details: ['خلأ را مرحله‌ای و با تجهیزات مناسب ایجاد کنید.', 'دسیکانت را جدا از نمونه و در سطح مناسب قرار دهید.', 'دسیکاتور ترک‌خورده یا لب‌پریده را استفاده نکنید.'],
      variants: vacuumDesiccatorVariants
    },
    {
      slug: 'coiled-distillate',
      titleFa: 'اتصال مارپیچی تقطیر',
      titleEn: 'Coiled Distillate Joint',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'جزئی از مجموعه‌های شیشه‌ای تقطیر و انتقال بخار یا مایع.',
      introduction: 'اتصال مارپیچی در آرایش‌های شیشه‌ای تقطیر یا انتقال به کار می‌رود و باید با قطعات هم‌اندازه و سازگار مونتاژ شود. طراحی مسیر، آب‌بندی و پشتیبانی مکانیکی اهمیت دارد.',
      primaryUse: 'تقطیر و انتقال بخار یا مایع',
      safety: 'اتصالات شیشه‌ای را بدون فشار جانبی و با تجهیزات محافظ جابه‌جا کنید.',
      details: ['پیش از مونتاژ، همهٔ قطعات را از نظر ترک بررسی کنید.', 'اتصال را بدون اعمال نیروی پیچشی ببندید.', 'برای کار گرم، تکیه‌گاه و مسیر تخلیهٔ مناسب فراهم کنید.'],
      variants: coiledDistillateVariants
    },
    {
      slug: 'pipette-stand',
      titleFa: 'پایهٔ چرخشی پیپت',
      titleEn: 'Rotary Vertical Pipette Stand',
      category: 'accessories',
      categoryLabel: 'لوازم جانبی',
      summary: 'برای نگهداری منظم پیپت‌ها در وضعیت عمودی.',
      introduction: 'پایهٔ چرخشی پیپت، ابزارها را در وضعیت عمودی و قابل دسترس نگه می‌دارد. نظم مناسب از تماس نوک پیپت با سطح و آلودگی متقابل جلوگیری می‌کند.',
      primaryUse: 'نگهداری و سازمان‌دهی پیپت‌ها',
      safety: 'پایه را روی سطح صاف قرار دهید و ظرفیت آن را بیشتر از حد مجاز پر نکنید.',
      details: ['پیپت‌ها را با نوک رو به پایین و بدون تماس با پایه قرار دهید.', 'پایه را دور از لبهٔ میز نگه دارید.', 'در صورت ریختن ماده، پایه را طبق روش آزمایشگاه تمیز کنید.'],
      variants: pipetteStandVariants
    },
    {
      slug: 'allihn-condenser',
      titleFa: 'کندانسور آلیهن',
      titleEn: 'Allihn Condenser',
      category: 'glassware',
      categoryLabel: 'شیشه‌آلات',
      summary: 'برای چگالش بخار در مجموعه‌های استخراج یا رفلاکس.',
      introduction: 'کندانسور آلیهن با افزایش سطح تماس داخلی، بخار را در مجموعه‌های رفلاکس یا استخراج چگالیده می‌کند. گردش پیوستهٔ خنک‌کننده و اتصال پایدار برای کار ایمن ضروری است.',
      primaryUse: 'چگالش بخار در رفلاکس و استخراج',
      safety: 'جهت ورود و خروج آب خنک‌کننده و سلامت شیلنگ‌ها بررسی شود.',
      details: ['آب خنک‌کننده را از پایین وارد و از بالا خارج کنید.', 'شیلنگ‌ها را با بست مناسب ثابت کنید.', 'از گرم‌کردن مجموعه بدون گردش خنک‌کننده خودداری کنید.'],
      variants: allihnCondenserVariants
    },
    {
      slug: 'buffer-solutions',
      titleFa: 'محلول‌های بافر',
      titleEn: 'Buffer Solutions',
      category: 'solutions',
      categoryLabel: 'محلول و خشک‌کننده',
      summary: 'برای کنترل یا بررسی عملکرد اندازه‌گیری در pHهای مختلف.',
      introduction: 'محلول‌های بافر برای کنترل عملکرد ابزار اندازه‌گیری pH و مقایسهٔ پاسخ در نقاط مشخص استفاده می‌شوند. هر گزینه باید مطابق pH، تاریخ انقضا و شرایط نگهداری خودش انتخاب شود.',
      primaryUse: 'کالیبراسیون و کنترل اندازه‌گیری pH',
      safety: 'تاریخ انقضا، دمای مرجع و شرایط نگهداری روی برچسب بررسی شود.',
      details: ['برای هر بار استفاده مقدار لازم را جدا کنید.', 'محلول مصرف‌شده را به بطری اصلی برنگردانید.', 'بطری را پس از استفاده فوراً ببندید.'],
      variants: bufferVariants
    },
    {
      slug: 'silica-gel',
      titleFa: 'سیلیکاژل',
      titleEn: 'Silica Gel',
      category: 'solutions',
      categoryLabel: 'محلول و خشک‌کننده',
      summary: 'جاذب رطوبت در حالت‌های رنگی و میزان رطوبت متفاوت.',
      introduction: 'سیلیکاژل برای جذب رطوبت در محفظه‌ها و فرایندهای نگهداری استفاده می‌شود. رنگ و وضعیت خشک یا مرطوب باید هنگام مصرف ثبت و با روش داخلی آزمایشگاه تفسیر شود.',
      primaryUse: 'جذب رطوبت و کمک به نگهداری خشک',
      safety: 'رنگ و وضعیت رطوبت را طبق روش داخلی آزمایشگاه بررسی کنید.',
      details: ['سیلیکاژل را در ظرف دربسته و دور از رطوبت نگهداری کنید.', 'از تماس مستقیم با نمونه‌های حساس خودداری کنید.', 'احیای جاذب فقط با روش و دمای تأییدشده انجام شود.'],
      variantSummary: '۲ رنگ و ۲ وضعیت قابل‌مقایسه',
      variantGroups: [
        {
          id: 'color',
          label: 'رنگ سیلیکاژل',
          options: [
            { id: 'blue', label: 'آبی' },
            { id: 'orange', label: 'نارنجی' }
          ]
        },
        {
          id: 'state',
          label: 'مقایسهٔ وضعیت',
          options: [
            { id: 'dry', label: 'خشک' },
            { id: 'wet', label: 'مرطوب' }
          ]
        }
      ],
      variants: silicaGelVariants
    }
  ];

  const vendorUrls = {
    borosilVolumetric: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/volumetric-glassware/volumetric-flask/',
    borosilPipettes: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/volumetric-glassware/pipettes/',
    borosilBurettes: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/volumetric-glassware/burettes/',
    borosilBottles: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/laboratory-bottles-and-caps/laboratory-bottles/',
    borosilGeneral: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/general-laboratory-glassware/',
    borosilMicrobiology: 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/glassware-for-microbiology/',
    sigmaGlassware: 'https://www.sigmaaldrich.com/VU/en/products/labware/glassware',
    sigmaPetri: 'https://www.sigmaaldrich.com/US/en/products/labware/sample-handling/laboratory-containers-and-storage/petri-dishes',
    sigmaPorcelain: 'https://www.sigmaaldrich.com/US/en/substance/coorsporcelaincrucible1234598765',
    fisherVolumetric: 'https://www.fishersci.ca/ca/en/browse/90111072/Volumetric-Flasks?page=1',
    fisherReagent: 'https://www.fishersci.ca/ca/en/browse/90094113/reagent-bottles',
    fisherPetri: 'https://www.fishersci.ca/ca/en/browse/90111022/Petri-Dishes',
    fisherCrucibles: 'https://www.fishersci.ca/ca/en/browse/90094173/crucibles',
    fisherDishes: 'https://www.fishersci.ca/ca/en/browse/90111005/dishes',
    fisherSpecialty: 'https://www.fishersci.ca/ca/en/browse/90094011/verrerie-de-laboratoire-sp%C3%A9cialis%C3%A9e',
    trafalgarFlasks: 'https://trafalgarscientific.co.uk/glassware-volumetrics/flasks/',
    trafalgarBurette: 'https://trafalgarscientific.co.uk/glassware-volumetrics/burette/',
    trafalgarFunnels: 'https://trafalgarscientific.co.uk/glassware-volumetrics/funnels/',
    trafalgarDishes: 'https://trafalgarscientific.co.uk/glassware-volumetrics/dishes-bowls/',
    trafalgarDesiccators: 'https://trafalgarscientific.co.uk/glassware-volumetrics/dessicators/',
    trafalgarBottles: 'https://trafalgarscientific.co.uk/consumables/bottles/',
    trafalgarTestTubes: 'https://trafalgarscientific.co.uk/consumables/test-tubes/',
    trafalgarWatchGlass: 'https://trafalgarscientific.co.uk/consumables/watch-glass/',
    trafalgarPetri: 'https://trafalgarscientific.co.uk/consumables/petri-dishes/',
    fisherLongStemFunnels: 'https://www.fishersci.ca/shop/products/pyrex-funnels-precise-60-angle-bowls-150mm-stems-4/10326B',
    fisherPorcelainBuchner: 'https://www.fishersci.ca/shop/products/fisherbrand-porcelain-buchner-funnels-fixed-perforated-plates-10/p-4018227',
    fisherMortars: 'https://www.fishersci.ca/ca/en/browse/90180073/Mortars-and-Pestles',
    fisherTongs: 'https://www.fishersci.ca/ca/en/browse/90184134/tongs',
    borosilVacuumDesiccator: 'https://www.borosilscientific.com/product/3083-vacuum-desiccator-set/',
    borosilGrahamCondenser: 'https://www.borosilscientific.com/product/2560-graham-coiled-condenser/',
    fisherPipetteStands: 'https://www.fishersci.ca/shop/products/finnpipette-stands/p-4520840',
    borosilAllihnCondenser: 'https://www.borosilscientific.com/product/2480-allihn-condenser/'
  };

  const reference = (label, url) => ({ label, url });
  const sourceData = {
    'volumetric-flasks': {
      source: vendorUrls.borosilVolumetric,
      sources: [
        reference('Borosil Scientific: بالن حجمی', vendorUrls.borosilVolumetric),
        reference('Fisher Scientific: بالن‌های حجمی', vendorUrls.fisherVolumetric),
        reference('Sigma-Aldrich: بالن و شیشه‌آلات حجمی', 'https://www.sigmaaldrich.com/US/en/search/volumetric-glassware-flask?focus=products&page=1&perpage=30&sort=relevance&term=volumetric+glassware+flask&type=product'),
        reference('Trafalgar Scientific: فلاسک‌ها', vendorUrls.trafalgarFlasks)
      ],
      specifications: [
        { label: 'جنس مرجع', value: 'شیشهٔ بوروسیلیکات ۳٫۳؛ مدل‌ها می‌توانند شفاف یا کهربایی باشند.' },
        { label: 'کالیبراسیون', value: 'برای حجم ثابت؛ کلاس A یا B و استاندارد دقیق، وابسته به مدل سازنده است.' },
        { label: 'حجم‌های این خانواده', value: '۲۵، ۵۰، ۱۰۰، ۲۵۰، ۵۰۰ و ۱۰۰۰ میلی‌لیتر.' }
      ]
    },
    'reagent-bottles': {
      source: vendorUrls.borosilBottles,
      sources: [
        reference('Borosil Scientific: بطری‌ها و درپوش‌ها', vendorUrls.borosilBottles),
        reference('Fisher Scientific: بطری‌های معرف', vendorUrls.fisherReagent),
        reference('Trafalgar Scientific: بطری‌های آزمایشگاهی', vendorUrls.trafalgarBottles),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware)
      ],
      specifications: [
        { label: 'جنس', value: 'بسته به مدل: شیشهٔ بوروسیلیکات، شیشهٔ سودا-لایم یا پلیمر.' },
        { label: 'دهانه و درپوش', value: 'دهانهٔ باریک یا عریض و درپوش یا استاپر باید با ماده سازگار انتخاب شود.' },
        { label: 'حجم‌های مدل مرجع', value: '۵۰، ۱۰۰، ۲۵۰، ۵۰۰، ۱۰۰۰ و ۲۰۰۰ میلی‌لیتر در خانوادهٔ Borosil 1501.' },
        { label: 'نگهداری', value: 'برای مواد حساس به نور، مدل کهربایی یا محافظ نوری مناسب‌تر است.' }
      ]
    },
    'petri-dishes': {
      source: 'https://www.borosilscientific.com/product/3160-petri-dish/',
      sources: [
        reference('Borosil Scientific: پتری‌دیش بوروسیلیکات 3160', 'https://www.borosilscientific.com/product/3160-petri-dish/'),
        reference('Sigma-Aldrich: پتری‌دیش‌ها', vendorUrls.sigmaPetri),
        reference('Fisher Scientific: پتری‌دیش‌ها', vendorUrls.fisherPetri),
        reference('Borosil Scientific: شیشه‌آلات میکروبیولوژی', vendorUrls.borosilMicrobiology),
        reference('Trafalgar Scientific: پتری‌دیش‌ها', vendorUrls.trafalgarPetri)
      ],
      specifications: [
        { label: 'جنس این تصویر', value: 'شیشه؛ در بازار مدل‌های پلاستیکی یک‌بارمصرف و شیشه‌ای قابل‌استفادهٔ مجدد نیز وجود دارد.' },
        { label: 'کاربرد', value: 'کشت و مشاهدهٔ نمونه، آماده‌سازی محیط و کارهای کنترل کیفی، با انتخاب استریل یا غیراستریل بر اساس مدل.' },
        { label: 'ابعاد مدل مرجع', value: 'قطرهای ۵۰، ۸۰، ۱۰۰، ۱۵۰ و ۲۰۰ میلی‌متر در خانوادهٔ Borosil 3160؛ ارتفاع و ابعاد درپوش به گزینه وابسته است.' }
      ]
    },
    'porcelain-crucible': {
      source: vendorUrls.fisherCrucibles,
      sources: [
        reference('Fisher Scientific: بوتهٔ چینی Eisco با درپوش', 'https://www.fishersci.ca/shop/products/porcelain-crucibles-lid-squat-form-5/s15480'),
        reference('Fisher Scientific: بوته‌ها', vendorUrls.fisherCrucibles),
        reference('Sigma-Aldrich: بوتهٔ چینی Coors', vendorUrls.sigmaPorcelain),
        reference('Trafalgar Scientific: گروه ظروف و تجهیزات آزمایشگاهی', 'https://trafalgarscientific.co.uk/')
      ],
      specifications: [
        { label: 'جنس', value: 'چینی لعاب‌دار، معمولاً با درپوش جدا یا همراه، بسته به مدل.' },
        { label: 'ظرفیت‌های مدل مرجع', value: '۱۰، ۱۷، ۳۰، ۵۰ و ۱۰۰ میلی‌لیتر در گزینه‌های Eisco فرم کوتاه با درپوش.' },
        { label: 'فرم', value: 'فرم بلند و عریض در کاتالوگ‌ها عرضه می‌شود؛ ظرفیت و شکل با مدل تغییر می‌کند.' },
        { label: 'گرمادهی', value: 'حداکثر دما و نرخ گرم‌کردن یا سردکردن را از برگهٔ همان مدل بررسی کنید.' }
      ]
    },
    'glass-funnel-long-stem': {
      source: vendorUrls.fisherLongStemFunnels,
      sources: [
        reference('Fisher Scientific: قیف شیشه‌ای ساقه‌بلند Corning PYREX', vendorUrls.fisherLongStemFunnels),
        reference('Borosil Scientific: قیف‌های شیشه‌ای', 'https://www.borosilscientific.com/product/6140-glass-filter-funnel/'),
        reference('Trafalgar Scientific: قیف‌ها', vendorUrls.trafalgarFunnels)
      ],
      specifications: [
        { label: 'جنس مرجع', value: 'شیشهٔ بوروسیلیکات با زاویهٔ حدود ۶۰ درجه و ساقهٔ باریک و بلند.' },
        { label: 'گزینه‌های مدل مرجع', value: 'دهانه‌های ۵، ۶٫۵، ۷٫۵ و ۱۰ سانتی‌متر؛ ساقهٔ حدود ۱۵ سانتی‌متر.' },
        { label: 'کاربرد', value: 'انتقال مایع و فیلتراسیون ثقلی با کاغذ صافی و تکیه‌گاه مناسب.' }
      ]
    },
    'serological-pipettes': {
      source: 'https://www.borosilscientific.com/product/7081-serological-pipettes/',
      sources: [
        reference('Borosil Scientific: پیپت سرولوژیک 7081', 'https://www.borosilscientific.com/product/7081-serological-pipettes/'),
        reference('Borosil Scientific: پیپت سرولوژیک 7080', 'https://www.borosilscientific.com/product/7080-serological-pipettes/'),
        reference('Borosil Scientific: پیپت‌های آزمایشگاهی', vendorUrls.borosilPipettes),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware),
        reference('Trafalgar Scientific: فلاسک‌ها و شیشه‌آلات حجمی', vendorUrls.trafalgarFlasks)
      ],
      specifications: [
        { label: 'نوع', value: 'پیپت سرولوژیک برای انتقال حجمی؛ کلاس A یا B و ظرفیت دقیق به مدل وابسته است.' },
        { label: 'ظرفیت‌های مدل مرجع', value: '۰٫۱، ۰٫۲، ۱، ۲، ۵، ۱۰ و ۲۵ میلی‌لیتر در سری‌های Borosil 7080 و 7081.' },
        { label: 'روش مکش', value: 'فقط با پوآر یا پیپت‌فیلر استفاده شود؛ مکش با دهان ممنوع است.' },
        { label: 'کنترل کیفیت', value: 'کالیبراسیون، روش استریل‌سازی و سازگاری ماده باید پیش از کار بررسی شود.' }
      ]
    },
    'watch-glass': {
      source: 'https://www.borosilscientific.com/product/9986-watch-glasses/',
      sources: [
        reference('Borosil Scientific: شیشهٔ ساعت 9986', 'https://www.borosilscientific.com/product/9986-watch-glasses/'),
        reference('Trafalgar Scientific: شیشهٔ ساعت', vendorUrls.trafalgarWatchGlass),
        reference('Fisher Scientific: ظروف کم‌عمق آزمایشگاهی', vendorUrls.fisherDishes),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware)
      ],
      specifications: [
        { label: 'جنس', value: 'شیشه؛ قطر و ضخامت باید از مدل انتخابی خوانده شود.' },
        { label: 'قطرهای مدل مرجع', value: '۸۰، ۱۰۰، ۱۲۰ و ۱۵۰ میلی‌متر در سری Borosil 9986 S-Line.' },
        { label: 'کاربرد', value: 'پوشاندن بشر، تبخیر محدود و جابه‌جایی یا نگهداری کوتاه‌مدت نمونه.' },
        { label: 'استفادهٔ حرارتی', value: 'تنها با روش آزمایش و نرخ تغییر دمای سازگار با همان شیشه انجام شود.' }
      ]
    },
    'glass-burette': {
      source: 'https://www.borosilscientific.com/product/2123-burettes/',
      sources: [
        reference('Borosil Scientific: بورت 2123', 'https://www.borosilscientific.com/product/2123-burettes/'),
        reference('Borosil Scientific: بورت‌ها', vendorUrls.borosilBurettes),
        reference('Trafalgar Scientific: بورت‌ها', vendorUrls.trafalgarBurette),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware)
      ],
      specifications: [
        { label: 'جنس و اجزا', value: 'لولهٔ مدرج شیشه‌ای با شیر؛ جنس شیر و ظرفیت در مدل‌های مختلف تغییر می‌کند.' },
        { label: 'ظرفیت‌های مدل مرجع', value: '۵، ۱۰، ۲۵، ۵۰ و ۱۰۰ میلی‌لیتر در بورت Borosil 2123.' },
        { label: 'کلاس دقت', value: 'مدل‌های Class A، Class B یا Class AS در کاتالوگ‌ها دیده می‌شوند؛ انتخاب را با روش آزمون هماهنگ کنید.' },
        { label: 'کاربرد', value: 'افزودن کنترل‌شدهٔ محلول در تیتر کردن و اندازه‌گیری حجمی.' }
      ]
    },
    'separating-funnel': {
      source: 'https://www.borosilscientific.com/product/6403-separating-funnel-pear-shape/',
      sources: [
        reference('Borosil Scientific: قیف جداکنندهٔ 6403', 'https://www.borosilscientific.com/product/6403-separating-funnel-pear-shape/'),
        reference('Trafalgar Scientific: قیف‌ها', vendorUrls.trafalgarFunnels),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware),
        reference('Fisher Scientific: شیشه‌آلات تخصصی', vendorUrls.fisherSpecialty)
      ],
      specifications: [
        { label: 'ساختار', value: 'بدنهٔ شیشه‌ای گلابی‌شکل با شیر و درپوش؛ جنس شیر و نوع اتصال باید از مدل تأیید شود.' },
        { label: 'ظرفیت‌های مدل مرجع', value: '۱۲۵، ۲۵۰، ۵۰۰، ۱۰۰۰، ۲۰۰۰ و ۵۰۰۰ میلی‌لیتر در مدل Borosil 6403.' },
        { label: 'کاربرد', value: 'جداسازی فازهای مایع غیرقابل‌اختلاط.' },
        { label: 'ایمنی فرایند', value: 'در صورت احتمال تشکیل فشار، پیش از بازکردن شیر یا درپوش، روش تخلیهٔ فشار اجرا شود.' }
      ]
    },
    'buchner-funnel': {
      source: vendorUrls.fisherPorcelainBuchner,
      sources: [
        reference('Fisher Scientific: قیف بوخنر چینی Fisherbrand', vendorUrls.fisherPorcelainBuchner),
        reference('Fisher Scientific: کاتالوگ قیف‌های آزمایشگاهی', 'https://www.fishersci.ca/content/dam/fishersci/en_US/documents/programs/education/brochures-and-catalogs/catalogs/united-scientific-2023-laboratory-catalog.pdf'),
        reference('Trafalgar Scientific: قیف‌ها', vendorUrls.trafalgarFunnels)
      ],
      specifications: [
        { label: 'جنس مدل مرجع', value: 'چینی لعاب‌دار با صفحهٔ سوراخ‌دار ثابت؛ لبه بدون لعاب است.' },
        { label: 'گزینه‌های مدل مرجع', value: 'ظرفیت‌های ۸۷، ۱۸۶، ۳۲۰، ۵۵۰ و ۱۸۶۰ میلی‌لیتر.' },
        { label: 'نقطهٔ کنترل', value: 'آب‌بندی، سلامت ظرف خلأ و سازگاری کاغذ صافی پیش از ایجاد خلأ بررسی شود.' }
      ]
    },
    'porcelain-mortar-pestle': {
      source: vendorUrls.fisherMortars,
      sources: [
        reference('Fisher Scientific: هاون‌ها و دسته‌ها', vendorUrls.fisherMortars),
        reference('Fisher Scientific: کاتالوگ هاون چینی', 'https://www.fishersci.ca/content/dam/fishersci/en_US/documents/programs/education/brochures-and-catalogs/catalogs/united-scientific-2023-laboratory-catalog.pdf'),
        reference('Sigma-Aldrich: ظروف چینی آزمایشگاهی', vendorUrls.sigmaPorcelain)
      ],
      specifications: [
        { label: 'جنس', value: 'چینی لعاب‌دار؛ زبری سطح و سازگاری آن با نمونه باید بررسی شود.' },
        { label: 'گزینه‌های مدل مرجع', value: 'ظرفیت‌های ۵۰، ۷۰، ۱۵۰، ۲۷۵، ۴۰۰، ۷۵۰ و ۱۹۰۰ میلی‌لیتر.' },
        { label: 'کاربرد', value: 'خردکردن و همگن‌سازی مقدارهای کوچک از جامدات.' },
        { label: 'محدودیت', value: 'برای مواد ناشناخته یا واکنش‌پذیر، آسیاب‌کردن بدون بررسی سازگاری انجام نشود.' }
      ]
    },
    'screw-cap-test-tube': {
      source: vendorUrls.trafalgarTestTubes,
      sources: [
        reference('Fisher Scientific: لولهٔ آزمایش شیشه‌ای درپیچ‌دار', 'https://www.fishersci.ca/shop/products/glass-test-tube-screw-cap/s28026'),
        reference('Trafalgar Scientific: لوله‌های آزمایش', vendorUrls.trafalgarTestTubes),
        reference('Borosil Scientific: شیشه‌آلات عمومی', vendorUrls.borosilGeneral),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware)
      ],
      specifications: [
        { label: 'جنس', value: 'بدنهٔ تصویر شیشه‌ای است؛ جنس درپوش و نوع رزوه باید از مدل انتخابی مشخص شود.' },
        { label: 'ظرفیت‌های مدل مرجع', value: '۵، ۱۰، ۱۵، ۲۰، ۳۰ و ۵۰ میلی‌لیتر در گزینه‌های Eisco با درپوش پیچی.' },
        { label: 'کاربرد', value: 'نگهداری کوتاه‌مدت یا آماده‌سازی حجم کم نمونه.' },
        { label: 'فشار و گرما', value: 'لولهٔ دربسته برای گرمادهی یا فرایند پرفشار مناسب فرض نشود.' }
      ]
    },
    'crucible-tongs': {
      source: vendorUrls.fisherTongs,
      sources: [
        reference('Fisher Scientific: انبرها', vendorUrls.fisherTongs),
        reference('Fisher Scientific: کاتالوگ انبر بوته', 'https://www.fishersci.ca/content/dam/fishersci/en_CA/documents/brochures-and-catalogs/catalogs/TFS_LabEssentials_2016_CANADA.pdf')
      ],
      specifications: [
        { label: 'جنس', value: 'فولاد زنگ‌نزن در مدل‌های مرجع؛ طول و شکل فک به گزینه وابسته است.' },
        { label: 'گزینه‌های مدل مرجع', value: 'طول‌های ۹، ۱۸ و ۲۴ اینچ برای دسترسی معمولی تا فاصلهٔ بیشتر از کوره.' },
        { label: 'کاربرد', value: 'جابه‌جایی بوته یا ظرف داغ بدون تماس مستقیم دست.' },
        { label: 'کنترل پیش از کار', value: 'پایداری فک‌ها، وزن ظرف و مسیر انتقال پیش از بلندکردن بررسی شود.' }
      ]
    },
    'crystallizing-dish': {
      source: 'https://www.borosilscientific.com/product/3140-crystallizing-dishes/',
      sources: [
        reference('Borosil Scientific: ظرف تبلور 3140', 'https://www.borosilscientific.com/product/3140-crystallizing-dishes/'),
        reference('Sigma-Aldrich: شیشه‌آلات و ظروف تبلور', vendorUrls.sigmaGlassware),
        reference('Trafalgar Scientific: ظروف و کاسه‌های آزمایشگاهی', vendorUrls.trafalgarDishes),
        reference('Fisher Scientific: ظروف کم‌عمق آزمایشگاهی', vendorUrls.fisherDishes)
      ],
      specifications: [
        { label: 'جنس مرجع', value: 'شیشهٔ بوروسیلیکات در برخی مدل‌ها؛ جنس و وجود لبهٔ تخلیه به مدل بستگی دارد.' },
        { label: 'ظرفیت‌های مدل مرجع', value: 'ظرف‌های ۳۳۰، ۱۱۵۰ و ۲۵۰۰ میلی‌لیتری با ابعاد متفاوت در خانوادهٔ Borosil 3140.' },
        { label: 'کاربرد', value: 'تبخیر کنترل‌شده و تشکیل بلور از محلول.' },
        { label: 'کنترل فرایند', value: 'سطح وسیع تبخیر، دما و سرعت تبخیر باید با ماهیت محلول هماهنگ شود.' }
      ]
    },
    'vacuum-desiccator': {
      source: vendorUrls.borosilVacuumDesiccator,
      sources: [
        reference('Borosil Scientific: دسیکاتور خلأ 3083', vendorUrls.borosilVacuumDesiccator),
        reference('Borosil Scientific: راهنمای دسیکاتورها', 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/general-laboratory-glassware/desiccators/'),
        reference('Trafalgar Scientific: دسیکاتورها', vendorUrls.trafalgarDesiccators)
      ],
      specifications: [
        { label: 'ساختار', value: 'بدنه و درپوش شیشه‌ای با صفحهٔ چینی و شیر خلأ؛ مدل 3083 برای استفاده زیر خلأ طراحی شده است.' },
        { label: 'گزینه‌های مدل مرجع', value: 'قطر اسمی ۱۰۰، ۱۵۰، ۲۰۰، ۲۵۰ و ۳۰۰ میلی‌متر.' },
        { label: 'کاربرد', value: 'خشک‌کردن نمونه یا محافظت از مواد رطوبت‌گیر و حساس به رطوبت.' },
        { label: 'ایمنی', value: 'بدنه، لبهٔ آب‌بندی و اتصال خلأ پیش از استفاده بررسی شود؛ ظرف ترک‌خورده استفاده نشود.' }
      ]
    },
    'coiled-distillate': {
      source: vendorUrls.borosilGrahamCondenser,
      sources: [
        reference('Borosil Scientific: کندانسور مارپیچی Graham 2560', vendorUrls.borosilGrahamCondenser),
        reference('Fisher Scientific: کندانسورهای Graham', 'https://www.fishersci.ca/ca/en/browse/90094027/graham-condensers'),
        reference('Sigma-Aldrich: شیشه‌آلات آزمایشگاهی', vendorUrls.sigmaGlassware)
      ],
      specifications: [
        { label: 'جنس', value: 'شیشهٔ آزمایشگاهی با لولهٔ داخلی مارپیچی و اتصال‌های قابل تعویض.' },
        { label: 'گزینه‌های مدل مرجع', value: 'طول ژاکت‌های ۳۰۰، ۴۰۰ و ۵۰۰ میلی‌متر با اتصال ۲۴/۲۹.' },
        { label: 'کاربرد', value: 'جزئی از سامانه‌های تقطیر و انتقال بخار یا مایع.' },
        { label: 'مونتاژ', value: 'اتصال‌ها بدون فشار جانبی بسته شوند و برای قطعهٔ سنگین تکیه‌گاه فراهم شود.' }
      ]
    },
    'pipette-stand': {
      source: vendorUrls.fisherPipetteStands,
      sources: [
        reference('Fisher Scientific: پایه‌های چرخشی Finnpipette', vendorUrls.fisherPipetteStands),
        reference('Fisher Scientific: پایهٔ چرخشی Bel-Art با ۹۴ جایگاه', 'https://www.fishersci.ca/shop/products/bel-art-scienceware-rotary-pipet-stand/03410507'),
        reference('Fisher Scientific: پایهٔ چرخشی Universal', 'https://www.fishersci.ca/shop/products/universal-carousel-pipette-stand-7/p-200000191')
      ],
      specifications: [
        { label: 'جنس و طراحی', value: 'پایه‌های چرخشی از پلیمر یا پلاستیک مهندسی؛ جنس دقیق به مدل وابسته است.' },
        { label: 'گزینه‌های مرجع', value: 'از پایهٔ ۶ دستی یا ۳ الکترونیکی تا پایهٔ چرخشی ۹۴ پیپت.' },
        { label: 'کاربرد', value: 'نگهداری عمودی و سازمان‌دهی پیپت‌ها روی سطح پایدار.' },
        { label: 'کنترل آلودگی', value: 'نوک پیپت‌ها با سطح پایه تماس نداشته باشند و پایه پس از ریخت‌وپاش تمیز شود.' }
      ]
    },
    'allihn-condenser': {
      source: vendorUrls.borosilAllihnCondenser,
      sources: [
        reference('Borosil Scientific: کندانسور آلیهن 2480', vendorUrls.borosilAllihnCondenser),
        reference('Borosil Scientific: گروه کندانسورها', 'https://www.borosilscientific.com/product-category/glassware-consumables/laboratory-glassware/general-laboratory-glassware/chromatography-columns/'),
        reference('Fisher Scientific: شیشه‌آلات تخصصی', vendorUrls.fisherSpecialty)
      ],
      specifications: [
        { label: 'جنس', value: 'شیشهٔ آزمایشگاهی با حباب‌های متوالی برای افزایش سطح چگالش.' },
        { label: 'گزینه‌های مدل مرجع', value: 'طول ژاکت‌های ۲۰۰، ۳۰۰، ۴۰۰ و ۶۰۰ میلی‌متر.' },
        { label: 'کاربرد', value: 'چگالش بخار در رفلاکس یا سامانه‌های استخراج.' },
        { label: 'خنک‌کاری', value: 'آب معمولاً از پایین وارد و از بالای پوشش خارج می‌شود؛ شیلنگ‌ها باید مهار شوند.' }
      ]
    },
    'buffer-solutions': {
      source: 'https://www.fishersci.ca/shop/products/orion-standard-all-in-one-ph-buffer-kits/p-10062000',
      sources: [
        reference('Fisher Scientific: کیت بافر pH', 'https://www.fishersci.ca/shop/products/orion-standard-all-in-one-ph-buffer-kits/p-10062000'),
        reference('Sigma-Aldrich: راهنمای کالیبراسیون بافر', 'https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/marketing/global/documents/328/848/ph-buffers-br8716en-ms.pdf'),
        reference('Trafalgar Scientific: محلول‌های pH و رسانایی', 'https://trafalgarscientific.co.uk/chemicals/ph-conductivity/')
      ],
      specifications: [
        { label: 'گزینه‌های این خانواده', value: 'بافرهای pH ۴، ۷ و ۱۰ برای کنترل یا کالیبراسیون pH متر.' },
        { label: 'کد رنگ مرجع', value: 'در نمونهٔ Fisher، pH ۴ صورتی، pH ۷ زرد و pH ۱۰ آبی معرفی شده است.' },
        { label: 'قابلیت ردیابی', value: 'ردیابی NIST، دقت و تاریخ انقضا به برند و محصول انتخابی وابسته است.' }
      ]
    },
    'silica-gel': {
      source: 'https://www.fishersci.ca/ca/en/browse/90218014/lab-desiccants-and-drying-agents?page=1',
      sources: [
        reference('Fisher Scientific: خشک‌کننده‌های آزمایشگاهی', 'https://www.fishersci.ca/ca/en/browse/90218014/lab-desiccants-and-drying-agents?page=1'),
        reference('Fisher Scientific: سیلیکاژل نشانگر', 'https://www.fishersci.ca/shop/products/silica-gel-desiccant-indicating-acs-thermo-scientific/AA40381A4'),
        reference('Sigma-Aldrich: سیلیکاژل نشانگر', 'https://www.sigmaaldrich.com/US/en/product/sigald/13767'),
        reference('Borosil Scientific: کاتالوگ محصولات', 'https://www.borosilscientific.com/wp-content/uploads/2024/06/PRODUCT-CATALOGUE-Pricelist-updated-2024-25-1.pdf')
      ],
      specifications: [
        { label: 'جنس و کارکرد', value: 'سیلیکاژل جامد و رطوبت‌گیر برای خشک نگه‌داشتن محیط یا نمونه، با وضعیت و اندازهٔ دانهٔ وابسته به محصول.' },
        { label: 'نشانگر رطوبت', value: 'رنگ شاخص به فرمول محصول وابسته است؛ در منابع نمونه، آبی به صورتی یا نارنجی به سبز تغییر می‌کند.' },
        { label: 'احیا و جایگزینی', value: 'دمای احیا را از برگهٔ همان محصول بخوانید؛ رنگ تصویر به‌تنهایی جایگزین روش تأیید اشباع نیست.' }
      ]
    }
  };

  catalog.forEach(item => {
    const data = sourceData[item.slug];
    if (data) Object.assign(item, data);
  });

  window.LAB_EQUIPMENT_CATALOG = catalog;
})();
