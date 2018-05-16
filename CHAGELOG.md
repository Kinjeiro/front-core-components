# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [last version][1.3.0 - ] (2018.05.16)
### !!! Breaking changes:
1. Обновил кору для 1.3.0

### Features:

### Dependencies:

### Commits:
    - обновил front-core до 1.3.0
    
    
## [1.2.24] - 2018-05-04
### !!! Breaking changes:

### Features:

### Dependencies:

### Commits:
    - chore(npm): - обновил npm repo
    - feat(ScrollNavigation): - labelBefore \ labelAfter
    - chore(package.json): - зависимости
    - chore(package.json): - настройки сборки и обновление patch зависимости от front-core
    - bug(components, ScrollNavigator): - number id падали с ошибкой при поиске по hash
    - update package-lock 
    - ScrollNavigation задал для контента position: relative чтобы при скроле попадать точно на целевой элемент. 
    - Обернул textarea контейнером .ui.form 
    - Add textarea field 
    - feat(AppLayout): - upBottomButtonsProps - либо false чтобы не использовать глобальные кнопки, либо мапа параметров
    - feat(ScrollNavigation): - доп scrollingOwn=true - чтобы обернуть сегменты в собственный скролл и позиционироваться по нему, либо scrollingOwn=id - чтобы обернуться и дать id (который потом в UpBottomButtons будет использоваться). useUpBottomButtons чтобы кнопки вверху-вниз показывать для них
    - bug(Tabs): - бага, что если name node то неправильно key формировался
    - chore(depen): - обновление только в рамках patch изменений
    - feat(components): - @deprecated - не использовать index.js для выбора компонентов (чтобы не подцеплялись не нужные css)
    - feat(ScrollNavigation): - нужен таймаут в 1000 чтобы правильно скролл контайнер найти
    - feat(ScrollNavigation): - обновил до react-scroll@1.7.8 - теперь явно нужно указывать контейнер, поэтому сделал автоматический его поиск, либо параметром можно задать
    - bug(Attachment): - если readOnly показывалась иконка для удаления
    - feat(docs): - слишком большой размер, убирем шрифты
    - feat(docs): - добавил доки
    - feat(package): - зависимости
    - feat(docs): - зависимости
    - feat(docs): - обновление док md

## [1.2.15] - 2018-03-27
### !!! Breaking changes:
1. Переименовал `FileInput` -> `Attachment`

### Dependencies:

### Features:
1. Множество готовых стилизованных компонентов
1. Готовые layouts для приложения c Header и для авторизации

### Commits:
    - feat(components): - добавил Notice 
        \\ UniTable 
        \\ куча правок 
        \\ переиеновал FileInputs в Attachments 
        \\ обновил кору 
        \\ для тестовой страницы обновил роутинг согласно последней коры 
        \\ добавил механизм документации
    - feat(core): - апдейт коры
    - feat(layout, i18n): - локализация для заголовков
    - chore(publish): - зависимости
    - chore(publish): - игнор
    - chore(publish): - игнор src
    - chore(publish): - данные для паблишинга
    - chore(test): - client stub test
    - chore(init): - начальные данные
