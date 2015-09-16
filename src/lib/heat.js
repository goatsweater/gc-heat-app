/*
HEAT Survey Controller
*/

var HEAT = {
  survey: {
    currentStep: 1,
    // Hide the current step panel and show the next one
    nextStep: function() {
      step = HEAT.survey.currentStep;
      $('#step' + step).addClass('hidden');
      step += 1;
      $('#step' + step).removeClass('hidden');
      HEAT.survey.currentStep = step;
    },
  }
}
