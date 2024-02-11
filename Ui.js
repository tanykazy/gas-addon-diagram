function onSlidesHomepageTrigger(event) {
  const sequenceCard = createSequenceCard(event);
  return [
    sequenceCard.build()
  ];
}

function createSequenceCard(event) {
  const card = CardService.newCardBuilder()
    .setName('Sequence')
    .setHeader(CardService.newCardHeader()
      .setTitle('Sequence'))
    .addSection(CardService.newCardSection()
      .setHeader('Insert')
      .addWidget(CardService.newTextButton()
        .setText('Participant')
        .setOnClickAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.SPINNER)
          .setFunctionName(insertParticipant.name))))
    .addSection(CardService.newCardSection()
      .setHeader('Layout')
      .addWidget(CardService.newTextButton()
        .setText('Relocate')
        .setOnClickAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.SPINNER)
          .setFunctionName(relocation.name))));

  return card;
}

function insertParticipant(event) {
  const presentation = SlidesApp.getActivePresentation();
  const selection = presentation.getSelection();
  const currentPage = selection.getCurrentPage();

  const shape = createParticipant(presentation, currentPage, 'Participant');

  verticalEven(presentation, currentPage);

  shape.select(true);

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('Participant created.'))
    .setStateChanged(true)
    .build();
}

function relocation(event) {
  const presentation = SlidesApp.getActivePresentation();
  const selection = presentation.getSelection();
  const currentPage = selection.getCurrentPage();
  relocationElements(presentation, currentPage);

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('Objects relocated.'))
    .setStateChanged(true)
    .build();
}
