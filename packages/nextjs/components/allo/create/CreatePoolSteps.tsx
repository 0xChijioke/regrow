
const CreatePoolSteps = ({ currentStep, completedSteps }: { currentStep: string, completedSteps: string[] }) => {



  return (
    <div className="flex justify-center">
        <ul className="steps">
            <li className={`step step-primary`}>Strategy</li>
            <li className={`step ${currentStep === '2' || currentStep === '3' || currentStep === '4' ? 'step-primary' : ''}`}>Metadata</li>
            <li className={`step ${currentStep === '3'  || currentStep === '4' ? 'step-primary' : ''}`}>Create Pool</li>
            <li className={`step ${currentStep === '4' ? 'step-primary' : ''}`}>Receive Product</li>
        </ul>
    </div>
  )
}

export default CreatePoolSteps