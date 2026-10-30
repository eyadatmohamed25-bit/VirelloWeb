import type { Lang } from '@/i18n/translations';

export type GenInput = {
  niche: string;
  platform: string;
  audience: string;
  language: Lang;
  tone: string;
};

export type IdeaItem = { title: string; description: string; hook: string };
export type ScriptItem = {
  title: string;
  hook: string;
  body: string;
  scenes: string[];
  cta: string;
};
export type CaptionItem = { caption: string };
export type HashtagItem = { hashtags: string[] };
export type PlannerDay = {
  day: string;
  topic: string;
  format: string;
  postTime: string;
  tip: string;
};
export type PlannerItem = { days: PlannerDay[] };

const AR = (en: string, ar: string, lang: Lang) => (lang === 'ar' ? ar : en);

const pick = <T,>(arr: T[], n: number, seed: number): T[] => {
  const result: T[] = [];
  const used = new Set<number>();
  let s = seed;
  while (result.length < n) {
    s = (s * 9301 + 49297) % 233280;
    const idx = Math.floor((s / 233280) * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
};

const seedFrom = (str: string) =>
  str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + Date.now() % 1000;

export function generateIdeas(input: GenInput): IdeaItem[] {
  const { niche, platform, audience, language, tone } = input;
  const seed = seedFrom(niche + platform + audience + tone);
  const n = niche.trim() || (language === 'ar' ? 'محتوى' : 'content');
  const aud = audience.trim() || (language === 'ar' ? 'الجمهور' : 'your audience');

  const templates: IdeaItem[] = [
    {
      title: AR(`5 ${n} mistakes everyone makes`, `5 أخطاء في ${n} يرتكبها الجميع`, language),
      description: AR(
        `A rapid-fire breakdown of the most common ${n} mistakes ${aud} fall into, with quick fixes for each.`,
        `تفصيل سريع لأكثر أخطاء ${n} شيوعاً التي يقع فيها ${aud} مع حلول سريعة لكل خطأ.`,
        language,
      ),
      hook: AR(
        `You're probably doing ${n} wrong — here are 5 mistakes to fix today.`,
        `ربما تمارس ${n} بشكل خاطئ — إليك 5 أخطاء تصلحها اليوم.`,
        language,
      ),
    },
    {
      title: AR(`I tried ${n} for 30 days — here's what happened`, `جرّبت ${n} لمدة 30 يوماً — إليك ما حدث`, language),
      description: AR(
        `A personal experiment format showing your journey with ${n}, the challenges, and the results.`,
        `تجربة شخصية تظهر رحلتك مع ${n} والتحديات والنتائج.`,
        language,
      ),
      hook: AR(`Day 1 vs Day 30 of ${n} — the results shocked me.`, `اليوم 1 مقابل اليوم 30 من ${n} — النتائج صدمتني.`, language),
    },
    {
      title: AR(`The ultimate ${n} starter guide for ${aud}`, `دليل ${n} الشامل للمبتدئين من ${aud}`, language),
      description: AR(
        `A beginner-friendly walkthrough that takes ${aud} from zero to confident with ${n}.`,
        `دليل مناسب للمبتدئين يأخذ ${aud} من الصفر إلى الثقة في ${n}.`,
        language,
      ),
      hook: AR(`If you're new to ${n}, this is the only guide you need.`, `إذا كنت جديداً على ${n} فهذا الدليل الوحيد الذي تحتاجه.`, language),
    },
    {
      title: AR(`${n} hacks that feel illegal to know`, `حيل ${n} تبدو وكأنها سرية`, language),
      description: AR(
        `A compilation of clever, lesser-known ${n} tips that save time and boost results.`,
        `مجموعة من حيل ${n} الذكية وغير المعروفة التي توفر الوقت وتعزز النتائج.`,
        language,
      ),
      hook: AR(`These ${n} tips are so good they should be illegal.`, `حيل ${n} هذه ممتازة لدرجة ينبغي أن تكون سرية.`, language),
    },
    {
      title: AR(`Before vs After: ${n} transformation`, `قبل وبعد: تحول ${n}`, language),
      description: AR(
        `A visual comparison showing dramatic before-and-after results using ${n}.`,
        `مقارنة بصرية تظهر نتائج دراماتيكية قبل وبعد استخدام ${n}.`,
        language,
      ),
      hook: AR(`Wait for the ${n} transformation at the end…`, `انتظر تحول ${n} في النهاية…`, language),
    },
    {
      title: AR(`POV: you just discovered ${n}`, `من منظورك: اكتشفت ${n} للتو`, language),
      description: AR(
        `A relatable POV-style video showing the excitement of discovering ${n} for the first time.`,
        `فيديو بأسلوب المنظور يظهر حماس اكتشاف ${n} لأول مرة.`,
        language,
      ),
      hook: AR(`POV: you just found out about ${n} and can't stop…`, `من منظورك: اكتشفت ${n} للتو ولا تستطيع التوقف…`, language),
    },
    {
      title: AR(`Reacting to ${n} trends`, `أتفاعل على اتجاهات ${n}`, language),
      description: AR(
        `A reaction video where you break down trending ${n} content and add your own take.`,
        `فيديو ردود فعل تحلل محتوى ${n} الرائج وتضيف رأيك الخاص.`,
        language,
      ),
      hook: AR(`Let's react to the wildest ${n} trends this week.`, `لنتفاعل مع أجرأ اتجاهات ${n} هذا الأسبوع.`, language),
    },
    {
      title: AR(`${n} on a budget — under $20`, `${n} بميزانية — أقل من 20 دولار`, language),
      description: AR(
        `Show ${aud} how to get great ${n} results without spending a fortune.`,
        `أرِ ${aud} كيف تحصل على نتائج رائعة في ${n} دون إنفاق ثروة.`,
        language,
      ),
      hook: AR(`${n} doesn't have to be expensive — here's proof.`, `${n} لا يجب أن يكون مكلفاً — إليك الدليل.`, language),
    },
    {
      title: AR(`Day in the life: ${n} edition`, `يوم في الحياة: نسخة ${n}`, language),
      description: AR(
        `A vlog-style look at how ${n} fits into your daily routine and workflow.`,
        `نظرة بأسلوب المدونة على كيفية اندماج ${n} في روتينك اليومي.`,
        language,
      ),
      hook: AR(`A day in my life centered around ${n}.`, `يوم في حياتي يتمحور حول ${n}.`, language),
    },
    {
      title: AR(`The truth about ${n} nobody tells you`, `الحقيقة حول ${n} التي لا يخبرك بها أحد`, language),
      description: AR(
        `An honest take on the realities of ${n} that most creators gloss over.`,
        `رأي صادق حول حقائق ${n} التي يتجاهلها معظم صنّاع المحتوى.`,
        language,
      ),
      hook: AR(`Nobody talks about this side of ${n}…`, `لا أحد يتحدث عن هذا الجانب من ${n}…`, language),
    },
    {
      title: AR(`Ranking ${n} from worst to best`, `ترتيب ${n} من الأسوأ للأفضل`, language),
      description: AR(
        `A tier-list style ranking of ${n} approaches, tools, or techniques.`,
        `ترتيب بأسلوب القائمة لأساليب ${n} أو أدواته أو تقنياته.`,
        language,
      ),
      hook: AR(`Ranking every ${n} method from S to F tier.`, `ترتيب كل أساليب ${n} من الفئة S إلى F.`, language),
    },
    {
      title: AR(`How ${n} changed my life in 60 seconds`, `كيف غيّر ${n} حياتي في 60 ثانية`, language),
      description: AR(
        `A punchy, emotional short about the personal impact of ${n}.`,
        `فيديو قصير ومؤثر عن التأثير الشخصي لـ ${n}.`,
        language,
      ),
      hook: AR(`60 seconds on how ${n} changed everything.`, `60 ثانية عن كيف غيّر ${n} كل شيء.`, language),
    },
  ];

  return pick(templates, 10, seed);
}

export function generateScript(input: GenInput): ScriptItem {
  const { niche, platform, audience, language, tone } = input;
  const seed = seedFrom(niche + platform + tone);
  const n = niche.trim() || (language === 'ar' ? 'موضوعك' : 'your topic');
  const aud = audience.trim() || (language === 'ar' ? 'الجمهور' : 'your audience');
  const pf = platform;

  const tonePrefix = AR(
    {
      energetic: '🔥',
      educational: '📚',
      funny: '😂',
      inspirational: '✨',
      professional: '💡',
      casual: '👋',
    }[tone] || '🔥',
    {
      energetic: '🔥',
      educational: '📚',
      funny: '😂',
      inspirational: '✨',
      professional: '💡',
      casual: '👋',
    }[tone] || '🔥',
    language,
  );

  if (language === 'ar') {
    return {
      title: `سكربت: ${n} لـ ${aud}`,
      hook: `${tonePrefix} توقف عن التمرير! إذا كنت من ${aud}، فـ ${n} سيغيّر طريقتك تماماً. في أول 3 ثوانٍ ستعرف لماذا…`,
      body: `مرحباً! اليوم سأشارك معكم كل ما تحتاجون معرفته عن ${n}. الكثير من ${aud} يبدأون بدون خطة، ويضيعون الوقت. لكن هذه الطريقة تغيّر كل شيء:\n\nأولاً، ابدأ بالأساسيات — لا تقفز للمراحل المتقدمة. ثانياً، خصّص 15 دقيقة يومياً فقط، فالاستمرارية أهم من الكثافة. ثالثاً، وثّق رحلتك على ${pf} لأن المحتوى عن رحلتك هو ما يصلك بالجمهور.\n\nالنتيجة؟ ستتقدم أسرع مما تتوقع وتبني مجتمعاً حولك.`,
      scenes: [
        'لقطة قريبة لوجهك وأنت تنظر مباشرة للكاميرا — الخطاف',
        'انتقال سريع وأنت تعرض الأدوات/المعدات على طاولة',
        'تصوير بزاوية علوية وأنت تعمل خطوة بخطوة',
        'مقسم شاشة: قبله وبعده لإظهار التقدم',
        'لقطة ختامية وأبتسم وتشير لزر المتابعة',
      ],
      cta: `إذا كان هذا مفيداً، تابعني للمزيد من محتوى ${n}، واحفظ هذا الفيديو لترجع إليه لاحقاً!`,
    };
  }

  return {
    title: `Script: ${n} for ${aud}`,
    hook: `${tonePrefix} Stop scrolling! If you're part of ${aud}, ${n} is about to change your entire approach. In the first 3 seconds you'll see why…`,
    body: `Hey! Today I'm sharing everything you need to know about ${n}. So many ${aud} start without a plan and waste hours. But this method changes the game:\n\nFirst, nail the fundamentals — don't jump to advanced stuff. Second, commit just 15 minutes a day; consistency beats intensity. Third, document your journey on ${pf} because people connect with the process, not just the result.\n\nThe payoff? You'll progress faster than you think and build an audience around your journey.`,
    scenes: [
      'Close-up of your face looking directly at the camera — the hook',
      'Quick cut to you laying out tools/equipment on a table',
      'Overhead shot of you working through it step by step',
      'Split screen: before vs after to show progress',
      'Closing shot, smile and point toward the follow button',
    ],
    cta: `If this helped, follow for more ${n} content and save this video so you can come back to it!`,
  };
}

export function generateCaptions(input: GenInput): CaptionItem[] {
  const { niche, platform, language, tone } = input;
  const seed = seedFrom(niche + platform + tone);
  const n = niche.trim() || (language === 'ar' ? 'هذا الموضوع' : 'this topic');
  const pf = platform;

  const templates: CaptionItem[] =
    language === 'ar'
      ? [
          { caption: `لم أكن أتوقع أن ${n} يصبح أهم جزء من يومي 🤯 اضغط حفظ إذا ساعدك هذا! #${n.replace(/\s/g, '')}` },
          { caption: `السر الأكبر في ${n}؟ الاستمرارية تغيّر كل شيء 💪 شاركه مع شخص يحتاجه على ${pf} ✨` },
          { caption: `جرّبت ${n} لمدة 30 يوم والنتيجة فاقت توقعاتي 🔥 أي يوم كان الأصعب؟ تعليق 👇` },
          { caption: `${n} ليس معقداً كما يبدو! ابدأ بخطوة صغيرة اليوم 🌱 وشاركني تقدمك!` },
          { caption: `أفضل 3 أدوات لـ ${n} وفّرت عليّ ساعات ⏰ احفظ هذا المنشور قبل ما يضيع 📌` },
          { caption: `كل ما تحتاج لمعرفته عن ${n} في 60 ثانية 🎯 تابع للمزيد من النصائح اليومية!` },
          { caption: `الناس تظن أن ${n} يحتاج موهبة… الحقيقة؟ يحتاج نظام 💡 طبّق واديلي معي!` },
          { caption: `POV: بدأت ${n} أخيراً ولا أستطيع التوقف 😍 ما رأيك؟ 👀` },
        ]
      : [
          { caption: `Didn't expect ${n} to become the best part of my day 🤯 Save this if it helped! #${n.replace(/\s/g, '')}` },
          { caption: `The biggest secret to ${n}? Consistency changes everything 💪 Share this with someone who needs it on ${pf} ✨` },
          { caption: `I tried ${n} for 30 days and the results blew my mind 🔥 Which day was hardest? Comment 👇` },
          { caption: `${n} isn't as complicated as it looks! Start with one small step today 🌱 Tag me in your progress!` },
          { caption: `My top 3 tools for ${n} that saved me hours ⏰ Save this post before it disappears 📌` },
          { caption: `Everything you need to know about ${n} in 60 seconds 🎯 Follow for daily tips!` },
          { caption: `People think ${n} takes talent… truth is, it takes a system 💪 Run it with me!` },
          { caption: `POV: you finally started ${n} and can't stop 😍 What do you think? 👀` },
        ];

  return pick(templates, 5, seed);
}

export function generateHashtags(input: GenInput): HashtagItem {
  const { niche, platform, language } = input;
  const n = niche.trim().toLowerCase().replace(/\s+/g, '');
  const base = n || (language === 'ar' ? 'محتوى' : 'content');

  const pfTags: Record<string, string[]> = {
    tiktok: ['fyp', 'foryou', 'tiktoktips', 'viral', 'trending'],
    instagram: ['reels', 'reelsinstagram', 'explore', 'reelsviral', 'instadaily'],
    youtube: ['shorts', 'youtubeshorts', 'shortsvideo', 'subscribe', 'ytshorts'],
    all: ['fyp', 'reels', 'shorts', 'viral', 'trending'],
  };

  const nicheTags =
    language === 'ar'
      ? [`${base}`, `${base}tips`, `${base}ideas`, `تعلم${base}`, `${base}2026`, `محتوى`, `صناعةمحتوى`, `تيكتوك`]
      : [`${base}`, `${base}tips`, `${base}ideas`, `${base}life`, `${base}2026`, `contentcreator`, `creatoreconomy`, `${base}community`];

  const platformTags = pfTags[platform] ?? pfTags.all;

  return { hashtags: [...nicheTags, ...platformTags].slice(0, 15) };
}

export function generatePlanner(input: GenInput): PlannerItem {
  const { niche, language } = input;
  const n = niche.trim() || (language === 'ar' ? 'محتواك' : 'your content');

  const daysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysAr = ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];

  const formatsEn = ['Tutorial', 'Storytime', 'Trend remix', 'Q&A', 'Behind the scenes', 'Reaction', 'Tips list'];
  const formatsAr = ['شرح', 'قصة', 'إعادة اتجاه', 'أسئلة وأجوبة', 'خلف الكواليس', 'ردود فعل', 'قائمة نصائح'];

  const topicsEn = [
    `Beginner's guide to ${n}`,
    `My biggest ${n} mistake (and how to avoid it)`,
    `Trying the latest ${n} trend`,
    `Answering your ${n} questions`,
    `Behind the scenes of my ${n} setup`,
    `Reacting to viral ${n} posts`,
    `5 ${n} tips you wish you knew sooner`,
  ];
  const topicsAr = [
    `دليل المبتدئين لـ ${n}`,
    `أكبر خطأ في ${n} (وكيف تتجنبه)`,
    `تجربة أحدث اتجاه في ${n}`,
    `أجيب على أسئلتكم حول ${n}`,
    `خلف كواليس إعداد ${n}`,
    `أتفاعل مع منشورات ${n} الفيرال`,
    `5 نصائح في ${n} تتمنى لو عرفتها مبكراً`,
  ];

  const timesEn = ['8:00 AM', '12:30 PM', '6:00 PM', '7:30 PM', '9:00 PM', '11:00 AM', '5:00 PM'];
  const timesAr = ['8:00 ص', '12:30 م', '6:00 م', '7:30 م', '9:00 م', '11:00 ص', '5:00 م'];

  const tipsEn = [
    'Hook viewers in the first 2 seconds.',
    'Reply to every comment in the first hour.',
    'Use trending audio for extra reach.',
    'Ask a question to spark comments.',
    'End with a clear call to action.',
    'Post when your audience is most active.',
    'Repurpose this into a carousel too.',
  ];
  const tipsAr = [
    'اجذب المشاهد في أول ثانيتين.',
    'رد على كل تعليق في الساعة الأولى.',
    'استخدم صوتاً رائجاً لمزيد من الوصول.',
    'اطرح سؤالاً لإثارة التعليقات.',
    'اختم بدعوة واضحة لاتخاذ إجراء.',
    'انشر عندما يكون جمهورك أكثر نشاطاً.',
    'أعد استخدام هذا في كاروسيل أيضاً.',
  ];

  const isAr = language === 'ar';
  const days = isAr ? daysAr : daysEn;
  const formats = isAr ? formatsAr : formatsEn;
  const topics = isAr ? topicsAr : topicsEn;
  const times = isAr ? timesAr : timesEn;
  const tips = isAr ? tipsAr : tipsEn;

  return {
    days: days.map((day, i) => ({
      day,
      topic: topics[i],
      format: formats[i],
      postTime: times[i],
      tip: tips[i],
    })),
  };
}
