# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [last version][1.6.0-1.5.?]
### !!! Breaking changes:
1. Переход на front-core@1.6.x (userId вместо username)

### Features:

### Dependencies:
    + front-core@1.6.х
    
### Dev Dependencies:

### Commits:

## [1.5.0-1.5.24] (2018-07-31)
### !!! Breaking changes:
1. Переход на front-core@1.4.x
2. Переход на front-core@1.5.x
3. Attachment - file больше не кладется в attachment-value, мапа файлов передается в первом параметре onAdd(newFilesMap, newAttachments, resultAttachments) 
   Первый параметр теперь не массив файлов, а мапа uuid: File 
4. Attachment - дефолтные значения constraints maxBytes=10mb, multipleMaxSize=10
5. Почистил AppLayout - убрал эти доисторический fartuna-main. Вывел скроллинг на body (чтобы в мобилах он смог исчезать). Поэтому проверьте еще раз стили
6. CSS: медия квейри respond-to 'sm' теперь не 480, а 320 (стандартный экран айфона)! поэтому проверьте свою верстку на маленьких экранах. 480 стало 'sm2' и не учитывается в последовательности

### Features:

### Dependencies:
    + front-core@1.5.х
    + react-image-gallery@0.8.11
    + rc-tree-select@2.2.5
    
### Dev Dependencies:
    + babel-minify@0.5.0 - минификация build-scrtips
    + babel-preset-minify@0.5.0 - минификация при компиляции src
    + cpr@3.0.1 - копирование в npm

### Commits:
    - chore(*) patch version: 1.5.21
    - !!! feat(css): Breaking changes: respond-to 'sm' теперь не 480 а 320 (стандартный экран айфона)! поэтому проверьте свою верстку на маленьких экранах 
        \\  добавил еще xxl: 1900px; retina: 2304px; r4k: 4096px;
    - feat(CB, TreeSelect): - для dive режима добавил кастомизацию частей textBack, textBackParent, textClose, renderTitle, renderSelectAll, renderItem
    - bug(AppLayout): теперь сайдбар не скрывается не в мобильном режиме - это нужно для кастомных сайдбаров
    - bug(sidebar): - бага с неправильным отображением делимитера
    - feat(CB, SimpleButton): - Button от SemanticUI .ui.button уже достала, поэтому добавил SimpleButton 
        \\  для SimpleButton есть onClickArgs чтобы лишний раз не биндить
    - feat(menu): - для меню добавил проперть isLink - чтобы явно указывать отображать как линку или как кнопку
    - feat(module, sidebar): - вынес в отдельный модуль module-sidebar и добавил редукса - isSidebarOpen, sidebarContext - чтобы иметь возможность передать данные в сайдбар и там не только меню рисовать
    - feat(CB, TreeSelect): - добавил типов к TreeSelect - DIVE - с погружением внутрь
    - chore(*) patch version: 1.5.20
    - bug(css): - фикс багов от сементика 
        \\  баг с делиметером для меню 
        \\  убрал компонент Select (уже есть CoreSelect)
    - chore(*) patch version: 1.5.19
    - chore(minimized): - добавил компиляцию и минификацию через npm run minimized
    - chore(*) patch version: 1.5.18
    - bug(modules): - забыл подключить модули серверные
    - chore(*) patch version: 1.5.17
    - chore(depen): - @reagentum/front-core@1.5.4 - подключение модулей
    - bug(cb, UserAvatar): - необходима начальная ширина для аватарки
    - feat(cb): - добавил модуль feature-attachments: компонент InstanceAttachment и серверный мок для загрузки файлов 
        \\  добавил Breadcrumbs 
        \\  Carousel (react-image-gallery@0.8.11) 
        \\  AmountInput 
        \\  TreeSelect (rc-tree-select@2.2.5)
    - chore(*) patch version: 1.5.15
    - chore(core): - перевел на кору 1.5
    - feat(modules): - для менюшек следующим параметром за пользователем идет moduleToRoutePrefixMap чтобы строить навигацию 
        \\  front-core@1.5.1
    - bug(UpBottomButtons): - не работали кнопки
    - feat(AppLayout): - добавил максимальную ширину .AppLayout__maxWidthItem ($max-width) 
        \\  проперть headerFixed (true) 
        \\  высота header AppLayout____headerFixedWrapper ($AppHeader-height) 
        \\  .AppLayout__headerWrapper, .AppLayout__contentWrapper, .AppLayout__footerWrapper - позволяют задавать фон во всю страницу
    - chore(*) patch version: 1.5.14
    - !!! feat(AppLayout): - почистил стили, убрал fartuna 
        \\  добавил footer
    - chore(*) patch version: 1.5.13
    - feat(cb, form, Attachment): - value может быть стрингой 
        \\  добавил propType
    - chore(*) patch version: 1.5.12
    - chore(core): - обновил кору и стили
    - feat(css): - мелкие исправления дизайна
    - feat(css, mixinx): - добавился disableLink - удобная вещь если нужно отключить линку без js
    - feat(cb, Pagination): - стилицазия Pagination для маленьких разрещений (только кнопка вперед и назад)
    - feat(cb, form, Attachment): - добавился проперть children - если это функция, то переменной падается функция открытия диалога выбора (onOpenDialog) => {}
    - chore(build): - фикс чтобы можно было кору разворачивать не только из node_modules 2
    - chore(*) patch version: 1.5.11
    - feat(AppHeader): - вместо profileImageURI теперь нужно использовать компонент UserAvatar 
        \\  front-core@1.4.28
    - chore(build): - фикс чтобы можно было кору разворачивать не только из node_modules
    - chore(build): - можно разместить кору не только в npm но и в отдельной папке, поэтому билд скрипты могут быть запущены не только в node_modules
    - chore(*) patch version: 1.5.10
    - feat(BaseButton): - реализовали вместо Button BaseButton 
        \\  front-core@1.4.24
    - feat(AppLayout): - поддкоррекитровал паддинги проекта при различных разрешениях
    - chore(*) patch version: 1.5.9
    - !!! feat(Attachment) - file больше не кладется в attachment-value, мапа файлов передается в первом параметре onAdd(newFilesMap, newAttachments, resultAttachments)
        \\ newFilesMap теперь не массив файлов, а мапа uuid: File
        \\ добавил прогресс AttachInfo--loaded${progress} класс, показывающий загрузку файлов
        \\ проверка constraints - автоматическое обрезание выбранных файлов и warnings об этом
        \\ дефолтные значения maxBytes=10mb, multipleMaxSize=10
        \\ теперь пробрасывается accept - для указания ограничения на файлы
        \\ front-core@1.4.23
    - chore(*) patch version: 1.5.8
    - feat(cb, semantic) - добавил Pagination, Card 
        \\ semantic-ui-react@0.80.2 (но более высокую версию не нужно)
    - chore(*) patch version: 1.5.7
    - feat(cb) - убрал старый Sidebar 
        \\ добавил sidebarProps для AuthLayout
    - feat(cb) - вынес init.scss во время initComponents (чтобы не зависеть от AppLayout) 
        \\ добавил компоненты
    - chore(*) patch version: 1.5.6
    - bug(cb) - обновление стилей для AppHeader 
        \\ фиксы расположения 
        \\ теперь AppHeader подгрузажается через CB а не через AppLayout 
        \\ пофиксил скрытие димера при клике в сайдбар меню 
        \\ front-core@1.4.13
    - chore(*) patch version: 1.5.5
    - bug(cb, Input) - семантиковский инпут пока не работает с CoreInput html5 errors (какой-то хендлер не отрабатыват) + css классы очень массивны, поэтому убрал его пока
    - bug(auth) - front-core@1.4.12 
        \\ при логауте не учитывался contextPath
    - chore(*) patch version: 1.5.4
    - feat(Modal) - front-core@1.4.11 
        \\ отключил подалку, пока используем коровскую, а эту нужно допиливать
    - chore(*) patch version: 1.5.3
    - feat(css) - front-core@1.4.10 
        \\ подправил стили
    - chore(*) patch version: 1.5.2
    - feat(css) - добавил подключение проектных глобальных css переменных из var.js
    - feat(componentsBase) - компоннеты инициализируются в ClientRunner:initComponents
    - chore(*) patch version: 1.5.1
    - feat(frontCore, componentsBase) - переезд на front-core@1.4.4 
        \\ добавил в компоненты CB 
        \\ пофиксил авторизацию
    - chore(*) minor version: 1.5.0
    - feat(modal) - для модели можно задать modalProps.closeOnEscape(true) \ closeOnDimmerClick(true) \ closeOnDocumentClick(false)

## [1.4.0-1.4.7] (2018-07-02)
### !!! Breaking changes:
1. изменил верстку header, AppLayout и высоты, проверяйте свой дизайн, особенно с табами и константами ($header-size, $header-size-sm, $height-tabs-menu, $height-tabs-menu-sm)
2. Обновил front-core@1.3.33 - почищены депенденси, нужно проверить работоспособность сборки
    - удалил "redux-devtools"
    - удалил "redux-devtools-extension"
    - удалил "format-number"
    - удалил "email-validator"
    - удалил "fast-json-patch"
    - удалил "store2"
    - удалил "react-localization"
    - удалил "object-hash"
    - удалил "jsonwebtoken"
    - удалил "google-libphonenumber"
    - удалил "hawk"
3. UniTable: изменил сигнатуру методов onSelect \ onSelectPage \ onSelectAll - сначала идут id чтобы добавить единообразия с redux-tables 

### Features:

### Dependencies:

### Commits:
    - chore(*) patch version: 1.4.7 
    - chore(dep): - front-core@1.3.37 
    - feat(Header): - profileUrl - добавил возможность задать урл для профайл имени
        \\ useModalLogin - если допускаются роуты вне авторизации, чтобы появлялось окно авторизации, а не редирект (по умолчанию включено) 
    - bug(contextPath): - баг с перебросом на логин страницу при contextPath
    - chore(*) patch version: 1.4.6 
    - feat(UniTable): - добавил linkTo
    - chore(*) patch version: 1.4.5
    - !!! chore(depen): - front-core@1.3.33 - поменялись зависимости 
    - !!! feat(UniTable): - изменил сигнатуру методов onSelect \ onSelectPage \ onSelectAll - сначала идут id чтобы добавить единообразия с redux-tables
        \\ добавил пример интеграции с redux-tables из коры
    - chore(*) patch version: 1.4.4 
    - feat(context, Header): - front-core@1.3.24
        \\ вынес в отдельный ContextHeaderProvider 
    - feat(components, Tabs): - добавил indexPath чтобы индекс воспринимать как первую активную табу 
    - chore(*) patch version: 1.4.3 
    - feat(components): - переместил Header 
        \\ пофиксил DatePicker 
        \\ добавил entity-tab.js propType 
    - chore(*) patch version: 1.4.2 
    - feat(components): - components/index.js не использовать (чтобы лишние компоненты не подгружались) 
        \\ добавил парочку оберток для semantic fields
    - feat(i18n): - английская локализация 
    - feat(component): - ErrorBoundary для перезагрузки ошибочных компонентов, когда исправили 
    - chore(*) patch version: 1.4.1 
    - feat(Header): - !!! изменил верстку header, AppLayout и высоты, проверяйте свой дизайн, особенно с табами и константами ($header-size, $header-size-sm, $height-tabs-menu, $height-tabs-menu-sm)
        \\ front-core@1.3.22 
        \\ обновил header: first, sidebar, title, left, user, right части 
        \\ можно теперь подать кастомный HeaderClass и headerProps 
        \\ описение model-menu.js \\ если незареган то кнопка "Войти" 
        \\ немного отрефакторил AppLayout css
    
## [1.3.2] (2018.07.02)
### !!! Breaking changes:
1. Обновил кору до 1.3.21 и связанные с ней breaking changes 

### Features:

### Dependencies:

### Commits:
    - feat(Header): - front-core@1.3.21
        \\ добавил возможность проставлять значение title \ headerTitle \ description \ leftPart \ rightPart через контектс (header-context-decorator) 
        \\ Вместо menu теперь используем userMenu и sidebarMenu 
        \\ menuItem теперь поддерживает type (delimiter, header) modal, content, avatar и все свойства Dropdown.Item)  
    - chore(depen): - обновил front-core до 1.3.13 
        \\ реакт до 16.4.2 (новые контексты) 
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
