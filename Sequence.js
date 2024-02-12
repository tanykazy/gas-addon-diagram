const Sequence = Object.freeze({
  Lifeline: 'Lifeline',
  Participant: 'Participant'
});

function createParticipant(presentation, slide, name) {
  const marginTop = getProperty(FieldName.SettingMarginTop) || DefaultMarginTop;
  const left = presentation.getPageWidth();
  const top = marginTop;
  const width = 100;
  const height = 25;

  const shape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, width, height)
    .setTitle(Sequence.Participant);
  const textRange = shape.getText()
    .setText(name);
  const line = createLifeline(presentation, slide, shape);

  return shape;
}

function createLifeline(presentation, slide, participant) {
  const marginBottom = getProperty(FieldName.SettingMarginBottom) || DefaultMarginBottom;
  const startLeft = participant.getLeft() + participant.getWidth() / 2;
  const startTop = participant.getTop() + participant.getHeight();
  const endLeft = startLeft;
  const endTop = presentation.getPageHeight() - marginBottom;
  const connectionSites = participant.getConnectionSites();

  const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, startLeft, startTop, endLeft, endTop)
    .setStartConnection(connectionSites[2])
    .setStartArrow(SlidesApp.ArrowStyle.NONE)
    .setEndArrow(SlidesApp.ArrowStyle.NONE)
    .setDashStyle(SlidesApp.DashStyle.LONG_DASH)
    .setWeight(1)
    .sendToBack()
    .setTitle(Sequence.Lifeline);

  return line;
}

function relocationElements(presentation, slide) {
  const pageWidth = presentation.getPageWidth();
  // const pageHeight = presentation.getPageHeight();
  const elements = scanSequence(presentation, slide, Sequence.Participant).sort((a, b) => a.getLeft() - b.getLeft());

  let sumOfWidth = 0;
  elements.forEach((element) => sumOfWidth += element.getWidth());

  const gapWidth = (pageWidth - sumOfWidth) / elements.length;

  let left = gapWidth / 2;
  for (const element of elements) {
    element.setLeft(left);
    left = left + gapWidth + element.getWidth();
  }
}

function verticalEven(presentation, slide) {
  const marginRight = getProperty(FieldName.SettingMarginRight) || DefaultMarginRight;
  const marginLeft = getProperty(FieldName.SettingMarginLeft) || DefaultMarginLeft;

  const pageWidth = presentation.getPageWidth() - (marginLeft + marginRight);
  const elements = scanSequence(presentation, slide, Sequence.Participant).sort((a, b) => a.getLeft() - b.getLeft());

  let sumOfWidth = 0;
  elements.forEach((element) => sumOfWidth += element.getWidth());

  const gapWidth = (pageWidth - sumOfWidth) / elements.length;

  let left = gapWidth / 2;
  for (const element of elements) {
    element.setLeft(left);
    left = left + gapWidth + element.getWidth();
  }
}

function scanSequence(presentation, slide, type) {
  const shapes = slide.getShapes();
  const sequence = shapes.filter((shape) => shape.getTitle() === type);
  return sequence;
}