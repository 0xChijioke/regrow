const CreatePoolSteps = ({ currentStep }: { currentStep: string }) => {
  return (
    <div className="flex justify-center">
      <ul className="steps">
        <li className={`step step-primary`}>Select Strategy</li>
        <li
          className={`step ${currentStep === "2" || currentStep === "3" || currentStep === "4" ? "step-primary" : ""}`}
        >
          Initialization and Pool Data
        </li>
        <li className={`step ${currentStep === "3" || currentStep === "4" ? "step-primary" : ""}`}>Create Pool</li>
        {/* <li className={`step ${currentStep === '4' ? 'step-primary' : ''}`}>Receivet</li> */}
      </ul>
    </div>
  );
};

export default CreatePoolSteps;
