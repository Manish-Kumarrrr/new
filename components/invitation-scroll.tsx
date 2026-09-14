'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { eventDetails, invitation, reveal } from '@/lib/invitation-data'

function WoodenRod({ position, side }: { position: number; side: 'top' | 'bottom' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`rod rod-${side}`}
      style={{ transform: `translateY(${position}px)` }}
    >
      <span className="rod-art" />
    </motion.div>
  )
}
function CoupleHero({ hidden }: { hidden: number }) {
  return (
    <motion.div className="couple-hero" style={{ opacity: 1 - hidden, y: -hidden * 18 }} aria-label="Illustration of a couple holding a scroll">
      {/* <div className="couple-halo" />
      <div className="couple-art" aria-hidden="true">
        <div className="person person-left"><span className="hair" /><span className="face" /><span className="body sherwani" /><span className="arm arm-left" /><span className="arm arm-right" /></div>
        <div className="person person-right"><span className="hair long" /><span className="face" /><span className="body sari" /><span className="arm arm-left" /><span className="arm arm-right" /></div>
        <div className="mini-scroll"><i /><b /></div>
      </div>
      <p className="hero-kicker">A little celebration of forever</p> */}
      {/* <img src="/assets/ganeshji.png" alt="Illustration of a couple holding a scroll" className="couple-art" /> */}
    </motion.div>
  )
}

function InvitationContent({ progress }: { progress: number }) {
  const title = reveal(progress, 0.16, 0.38)
  const message = reveal(progress, 0.3, 0.52)
  const details = reveal(progress, 0.43, 0.7)
  const closing = reveal(progress, 0.63, 0.88)
  return (
    <div className="invitation-content">
      {/* <motion.div className="ornament top-ornament" style={{ opacity: title, scale: 0.86 + title * 0.14 }} aria-hidden="true">❧</motion.div> */}
      <motion.p className="eyebrow" style={{ opacity: title }}>With joyful hearts</motion.p>
      <motion.h1 style={{ opacity: title, y: (1 - title) * 20 }}>{invitation.couple}</motion.h1>
      <motion.div className="gold-rule" style={{ opacity: title }}><span /><b>✦</b><span /></motion.div>
      <motion.p className="message" style={{ opacity: message }}>{invitation.message}</motion.p>
      <motion.div className="event-details" style={{ opacity: details }}>
        {eventDetails.map((item) => <div className="detail" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}
      </motion.div>
      <motion.div className="closing" style={{ opacity: closing }}>
        <span className="closing-mark">✦</span>
        <p>{invitation.closing}</p>
        <span className="closing-mark">✦</span>
      </motion.div>
      
    </div>
  )
}

export function InvitationScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [hasOpened, setHasOpened] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const openInvitation = async () => {
    if (hasOpened) return
    setHasOpened(true)
    const audio = audioRef.current
    if (!audio) return
    audio.loop = false
    try {
      await audio.play()
    } catch {
      setHasOpened(false)
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (!hasOpened) document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [hasOpened])

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const range = Math.max(1, sectionRef.current.offsetHeight - window.innerHeight)
      setProgress(prefersReducedMotion ? 1 : Math.min(1, Math.max(0, -rect.top / range)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [prefersReducedMotion])

  const spread = progress * 180
  const clothHeight = 48 + progress * 1200
  const contentOpacity = reveal(progress, 0.1, 0.27)

  return (
    <section ref={sectionRef} className="scroll-stage" aria-label="Interactive engagement invitation">
      <audio ref={audioRef} src="/assets/invitation-music.mp3" preload="auto" aria-hidden="true" />
      <div className="scroll-sticky">
        {!hasOpened && (
          <button className="opening-prompt" type="button" onClick={openInvitation} aria-label="Open the invitation">
            <span>Tap here</span>
          </button>
        )}
        {!hasOpened && <div className="pre-open-veil" aria-hidden="true" />}
        <div className={`celebration${hasOpened ? ' celebration-active' : ''}`} aria-hidden="true" />
        <CoupleHero hidden={reveal(progress, 0.02, 0.25)} />
        
        <div className="scroll-object" style={{ '--cloth-height': `${clothHeight}px`, '--content-opacity': contentOpacity } as React.CSSProperties}>
          
      <img src="/assets/ganeshji.png" alt="Illustration of a couple holding a scroll" className="couple-art" />
          <div className="fabric" style={{ height: clothHeight }}>
            {/* <div className="fabric-border" /> */}
            
            <InvitationContent progress={progress} />
          </div>
          {/* <WoodenRod side="top" position={-spread / 2} /> */}
          {/* <WoodenRod side="bottom" position={spread/2} /> */}
        </div>
        <motion.p className="scroll-hint" style={{ opacity: hasOpened ? 1 - reveal(progress, 0.02, 0.13) : 0 }}>Scroll to unfold the invitation <span>↓</span></motion.p>
      </div>
    </section>
  )
}
