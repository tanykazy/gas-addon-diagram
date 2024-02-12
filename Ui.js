const DefaultMarginTop = 10;
const DefaultMarginRight = 10;
const DefaultMarginBottom = 10;
const DefaultMarginLeft = 10;

const FieldName = Object.freeze({
  SettingMarginTop: 'SETTING_MARGIN_TOP',
  SettingMarginRight: 'SETTING_MARGIN_RIGHT',
  SettingMarginBottom: 'SETTING_MARGIN_BOTTOM',
  SettingMarginLeft: 'SETTING_MARGIN_LEFT'
});

function onSlidesHomepageTrigger(event) {
  const sequenceCard = createSequenceCard(event);
  return [
    sequenceCard.build()
  ];
}

function createSequenceCard(event) {
  const marginTop = getProperty(FieldName.SettingMarginTop) || DefaultMarginTop;
  const marginRight = getProperty(FieldName.SettingMarginRight) || DefaultMarginRight;
  const marginBottom = getProperty(FieldName.SettingMarginBottom) || DefaultMarginBottom;
  const marginLeft = getProperty(FieldName.SettingMarginLeft) || DefaultMarginLeft;

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
          .setFunctionName(relocation.name))))
    .addSection(CardService.newCardSection()
      .setCollapsible(true)
      .setHeader('Setting')
      .addWidget(CardService.newDecoratedText()
        .setWrapText(false)
        .setEndIcon(CardService.newIconImage()
          .setIconUrl('https://www.gstatic.com/images/icons/material/system/1x/margin_black_48dp.png'))
        .setText('Margin'))
      .addWidget(CardService.newTextInput()
        .setTitle('Top')
        .setMultiline(false)
        .setFieldName(FieldName.SettingMarginTop)
        .setValue(marginTop)
        .setOnChangeAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.NONE)
          .setFunctionName(onChangeSettings.name)
          .setParameters({
            field: FieldName.SettingMarginTop
          })
          .setPersistValues(false)))
      .addWidget(CardService.newTextInput()
        .setTitle('Right')
        .setMultiline(false)
        .setFieldName(FieldName.SettingMarginRight)
        .setValue(marginRight)
        .setOnChangeAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.NONE)
          .setFunctionName(onChangeSettings.name)
          .setParameters({
            field: FieldName.SettingMarginRight
          })
          .setPersistValues(false)))
      .addWidget(CardService.newTextInput()
        .setTitle('Bottom')
        .setMultiline(false)
        .setFieldName(FieldName.SettingMarginBottom)
        .setValue(marginBottom)
        .setOnChangeAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.NONE)
          .setFunctionName(onChangeSettings.name)
          .setParameters({
            field: FieldName.SettingMarginBottom
          })
          .setPersistValues(false)))
      .addWidget(CardService.newTextInput()
        .setTitle('Left')
        .setMultiline(false)
        .setFieldName(FieldName.SettingMarginLeft)
        .setValue(marginLeft)
        .setOnChangeAction(CardService.newAction()
          .setLoadIndicator(CardService.LoadIndicator.NONE)
          .setFunctionName(onChangeSettings.name)
          .setParameters({
            field: FieldName.SettingMarginLeft
          })
          .setPersistValues(false))));

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

function onChangeSettings(event) {
  const key = event.parameters.field;
  const value = Number(event.formInput[event.parameters.field]);

  if (Number.isNaN(value)) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText('Set margin points must a number.'))
      .setStateChanged(false)
      .build();
  }

  setProperty(key, value);
}
