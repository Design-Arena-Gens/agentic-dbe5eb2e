 "use client";

 import { useEffect, useState } from "react";

 type StoryStep = {
   id: string;
   title: string;
   description: string;
   duration: number;
 };

 const STORY_STEPS: StoryStep[] = [
   {
    id: "winter-window",
    title: "Frosted Winter Window",
    description:
      "Snowflakes etch lace across the glass as the quiet outside world glows in blue moonlight.",
    duration: 4200,
   },
   {
    id: "window-opens",
    title: "The Window Opens",
    description:
      "With a soft creak the panes part, inviting the camera to drift inside the warm cottage.",
    duration: 3600,
   },
   {
    id: "toy-box",
    title: "The Waiting Toy Box",
    description:
      "A painted wooden chest rests beneath garlands, holding the folk toys snug beneath its lid.",
    duration: 3600,
   },
   {
    id: "box-opens",
    title: "Toys Awaken",
    description:
      "The lid lifts and friendly clay and fabric figures peek out, blinking at the candlelight.",
    duration: 3600,
   },
   {
    id: "celebration",
    title: "New Year Celebration",
    description:
      "Lanterns shimmer, music swells, and the toys twirl in a cozy, hand-crafted holiday room.",
    duration: 5200,
   },
 ];

 const STEP_START_TIMES = STORY_STEPS.map((_, index) =>
   STORY_STEPS.slice(0, index).reduce((total, step) => total + step.duration, 0),
 );

 const STORY_DURATION = STORY_STEPS.reduce(
   (total, step) => total + step.duration,
   0,
 );

 export default function Home() {
   const [step, setStep] = useState(0);

   useEffect(() => {
     let timeouts: ReturnType<typeof setTimeout>[] = [];

     const schedule = () => {
       timeouts.forEach(clearTimeout);
       timeouts = [];
       setStep(0);

       STEP_START_TIMES.forEach((time, index) => {
         if (index === 0) return;
         timeouts.push(
           setTimeout(() => {
             setStep(index);
           }, time),
         );
       });

       timeouts.push(
         setTimeout(() => {
           schedule();
         }, STORY_DURATION),
       );
     };

     schedule();

     return () => {
       timeouts.forEach(clearTimeout);
     };
   }, []);

   const activeStep = STORY_STEPS[step] ?? STORY_STEPS[0];

   return (
     <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1021] via-[#111f3b] to-[#06070c] text-slate-100">
       <div className="snowfall pointer-events-none absolute inset-0" aria-hidden />
       <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-24 sm:px-10 lg:px-16">
         <div className="flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-6">
           <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.45em] text-sky-200/80 backdrop-blur">
             Folk Toy Animation
           </span>
           <h1 className="text-balance text-4xl font-semibold leading-tight text-sky-50 drop-shadow-[0_12px_35px_rgba(5,20,60,0.5)] sm:text-5xl lg:text-6xl">
             Winter Tale of Living Folk Toys
           </h1>
           <p className="text-pretty text-base text-sky-100/80 sm:text-lg">
             Follow a handcrafted short story as beloved clay and fabric toys
             wake from their box to usher in the New Year beneath a cozy winter
             window.
           </p>
         </div>

         <div className="mt-14 flex w-full flex-col items-center gap-12">
           <div className="relative w-full max-w-5xl">
             <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[3rem] border border-white/15 bg-gradient-to-b from-slate-900/60 via-slate-950/80 to-black/90 shadow-[0_65px_130px_-65px_rgba(12,26,64,0.8)] backdrop-blur">
               <SceneWindow step={step} />
               <SceneBox step={step} />
               <SceneCelebration step={step} />
             </div>
           </div>

           <CaptionPanel step={step} />
           <Timeline step={step} />
         </div>
       </section>
     </main>
   );
 }

 function SceneWindow({ step }: { step: number }) {
   const isVisible = step < 2;
   const isOpen = step >= 1;

   return (
     <div
       className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-[1400ms] ease-[cubic-bezier(.21,.61,.36,1)]
         ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-14 scale-95 blur-sm"}
       `}
     >
       <div className="window-stage relative flex h-[80%] w-[80%] max-w-[540px] items-center justify-center">
         <div className="absolute inset-0 rounded-[2.8rem] border border-white/25 bg-white/8 shadow-[0_45px_100px_-55px_rgba(25,60,120,0.8)] backdrop-blur-xl" />
         <div className="frost-pattern absolute inset-3 rounded-[2.4rem] border border-white/15" />
         <div className="absolute inset-3 flex overflow-hidden rounded-[2.4rem] border border-white/15 bg-gradient-to-br from-sky-500/20 via-sky-300/25 to-sky-600/10 shadow-inner">
           <div
             className={`window-panel window-panel-left ${isOpen ? "panel-open-left" : ""}`}
           />
           <div
             className={`window-panel window-panel-right ${isOpen ? "panel-open-right" : ""}`}
           />
         </div>
         <div className="absolute inset-[14%] rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),rgba(255,255,255,0)_65%)]" />
         <div
           className={`absolute inset-0 window-moon-glow transition-opacity duration-[1200ms] ${
             isOpen ? "opacity-35" : "opacity-75"
           }`}
         />
       </div>
     </div>
   );
 }

 function SceneBox({ step }: { step: number }) {
   const isVisible = step >= 2 && step < 4;
   const isOpening = step >= 3;

   return (
     <div
       className={`pointer-events-none absolute inset-0 flex items-end justify-center transition-all duration-[1200ms] ease-[cubic-bezier(.21,.61,.36,1)]
         ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"}
       `}
     >
       <div className="box-stage relative flex h-[78%] w-[80%] max-w-[520px] flex-col items-center justify-end">
         <div className="box-glow absolute inset-x-12 bottom-16 h-24 rounded-full bg-emerald-500/15 blur-[90px]" />
         <div className="holiday-lights absolute -top-10 flex w-full max-w-[420px] justify-between">
           {Array.from({ length: 10 }).map((_, index) => (
             <span key={index} style={{ animationDelay: `${index * 0.35}s` }} />
           ))}
         </div>
         <div className="relative w-full max-w-[460px]">
           <div className={`box-lid ${isOpening ? "box-lid-open" : ""}`} />
           <div className="box-body">
             <div className="box-panel left" />
             <div className="box-panel center" />
             <div className="box-panel right" />
             <div className="box-ribbon" />
           </div>
           <div
             className={`toy-peek flex items-end justify-center gap-6 transition-all duration-[1100ms] ${
               isOpening ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
             }`}
           >
             <ToyCharacter variant="clay" size="sm" dancing={isOpening} />
             <ToyCharacter variant="fabric" size="sm" dancing={isOpening} />
             <ToyCharacter variant="wooden" size="sm" dancing={isOpening} />
           </div>
         </div>
       </div>
     </div>
   );
 }

 function SceneCelebration({ step }: { step: number }) {
   const isVisible = step >= 4;

   return (
     <div
       className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-end transition-all duration-[1400ms] ease-[cubic-bezier(.21,.61,.36,1)]
         ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"}
       `}
     >
       <div className="celebration-room absolute inset-0" />
       <div className="garland absolute inset-x-0 top-10 flex items-center justify-evenly">
         {Array.from({ length: 11 }).map((_, index) => (
           <span key={index} style={{ animationDelay: `${index * 0.25}s` }} />
         ))}
       </div>
       <div className="lanterns absolute left-[12%] top-[14%] flex flex-col gap-6">
         <div className="lantern warm" />
         <div className="lantern cool" />
       </div>
       <div className="lanterns absolute right-[14%] top-[22%] flex flex-col gap-8">
         <div className="lantern cool" />
         <div className="lantern warm" />
       </div>

       <div className="relative z-10 mb-12 flex w-[80%] max-w-[640px] items-end justify-around gap-8">
         <ToyCharacter variant="clay" dancing={isVisible} />
         <ToyCharacter variant="fabric" dancing={isVisible} />
         <ToyCharacter variant="wooden" dancing={isVisible} />
       </div>

       <div className="relative z-10 mb-8 flex items-center gap-3 rounded-full bg-white/10 px-6 py-2 text-xs font-medium uppercase tracking-[0.42em] text-emerald-100/90 backdrop-blur">
         <span className="inline-block h-2 w-2 animate-ping rounded-full bg-emerald-200" />
         Happy New Year
       </div>
     </div>
   );
 }

 function CaptionPanel({ step }: { step: number }) {
   const activeStep = STORY_STEPS[step] ?? STORY_STEPS[0];

   return (
     <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-7 text-left shadow-[0_45px_100px_-65px_rgba(15,38,80,0.7)] backdrop-blur-md sm:p-9">
       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         <p className="text-xs uppercase tracking-[0.42em] text-sky-200/80">
           Scene {step + 1 < 10 ? `0${step + 1}` : step + 1}
         </p>
         <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:mx-6" />
         <span className="text-xs uppercase tracking-[0.35em] text-sky-200/70">
           {STORY_STEPS[step]?.id.replace(/-/g, " ") ?? STORY_STEPS[0].id}
         </span>
       </div>
       <h2 className="mt-5 text-balance text-2xl font-semibold text-sky-50 sm:text-3xl">
         {activeStep.title}
       </h2>
       <p className="mt-3 text-pretty text-base text-sky-100/80 sm:text-lg">
         {activeStep.description}
       </p>
     </div>
   );
 }

 function Timeline({ step }: { step: number }) {
   return (
     <div className="grid w-full max-w-5xl grid-cols-5 gap-3 sm:gap-4">
       {STORY_STEPS.map((timelineStep, index) => {
         const isActive = index === step;
         const isCompleted = index < step;

         return (
           <div
             key={timelineStep.id}
             className={`flex flex-col gap-2 rounded-3xl border border-white/10 p-4 transition-all duration-500
               ${isActive ? "bg-sky-500/15 shadow-[0_10px_45px_-25px_rgba(32,143,255,0.8)]" : ""}
               ${isCompleted ? "opacity-80" : "opacity-60"}
             `}
           >
             <div className="flex items-center justify-between text-xs uppercase tracking-[0.42em] text-white/60">
               <span>{String(index + 1).padStart(2, "0")}</span>
               <span className="h-px w-6 bg-white/20" />
               <span>{Math.round(timelineStep.duration / 1000)}s</span>
             </div>
             <p className="text-sm font-medium text-white/80">
               {timelineStep.title}
             </p>
           </div>
         );
       })}
     </div>
   );
 }

 type ToyVariant = "clay" | "fabric" | "wooden";
 type ToySize = "sm" | "md";

 function ToyCharacter({
   variant,
   dancing,
   size = "md",
 }: {
   variant: ToyVariant;
   dancing?: boolean;
   size?: ToySize;
 }) {
   const sizeClass =
     size === "sm"
       ? "h-28 w-20"
       : "h-40 w-28";

   return (
     <div
       className={`toy ${sizeClass} ${variant} ${
         dancing ? "toy-dancing" : ""
       }`}
       aria-hidden
     >
       <div className="toy-face" />
       <div className="toy-detail top" />
       <div className="toy-detail bottom" />
     </div>
   );
 }
