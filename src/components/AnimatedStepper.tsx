import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import AnimatedCheck from './svg/AnimatedCheck'

interface Step {
  number: number
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick: (stepNumber: number) => void
}

const AnimatedStepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  const scrollToCurrentStep = (stepIndex: number) => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea && scrollArea.children.length) {
      const stepElement = scrollArea.children[stepIndex] as HTMLElement

      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }
  }

  useEffect(() => {
    scrollToCurrentStep(currentStep - 1)
  }, [currentStep])

  return (
    // <ScrollArea className='w-full whitespace-nowrap rounded-md' dir='ltr'>
    <div
      className='flex items-center justify-between p-4 px-0'
      ref={scrollAreaRef}
    >
      {steps.map((step, index) => (
        <div key={step.number} className='flex flex-col items-center'>
          <div className='flex items-center' style={{ columnGap: 100 }}>
            <div className='flex flex-col items-center justify-center'>
              <motion.div
                onClick={() => onStepClick(step.number)}
                className={cn(
                  'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold',
                  step.number === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.number < currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground',
                )}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: step.number === currentStep ? 1.1 : 1,
                  transition: { duration: 0.3 },
                }}
              >
                {step.number < currentStep ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedCheck className='h-5 w-5' />
                  </motion.div>
                ) : (
                  // <div className='z-10'>
                  step.number
                  // </div>
                )}
              </motion.div>
              <motion.div
                className={cn(
                  'mt-2 w-20 text-center text-xs',
                  step.number === currentStep
                    ? 'font-bold text-black'
                    : 'text-black',
                )}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: step.number === currentStep ? 1 : 0.5,
                  transition: { duration: 0.3 },
                }}
              >
                {step.label}
              </motion.div>
            </div>
            {index < steps.length - 1 && (
              <motion.div
                className='-mr-5 mb-5 h-[2px] w-16'
                style={{ width: 233, marginLeft: -120 }}
                initial={{ backgroundColor: 'hsl(var(--muted))' }}
                animate={{
                  backgroundColor:
                    step.number <= currentStep
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted))',
                  transition: { duration: 0.3 },
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
    // <ScrollBar orientation='horizontal' />
    // </ScrollArea>
  )
}

export default AnimatedStepper
