function test() {
  const presentation = SlidesApp.getActivePresentation();
  console.log(presentation.getName());
  const slides = presentation.getSlides();
  const shapes = slides[0].getShapes();

  for (const shape of shapes) {
    console.log(shape.getShapeType().toString());
  }

  var selection = SlidesApp.getActivePresentation().getSelection();
  var currentPage = selection.getCurrentPage();
  console.log(currentPage);


  // createParticipant(presentation, slides[0], 'Test Participant');
  // createParticipant(presentation, slides[0], 'Test Participant');
  // createParticipant(presentation, slides[0], 'Test Participant');
}
