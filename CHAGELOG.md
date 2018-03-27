# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [last version][1.2.1 - 1.2.9]
### !!! Breaking changes:
* переместил src/common/app-redux/simple-module-factory -> src/common/app-redux/helpers/simple-module-factory<br/>Изменились параметры создания и по-новому называются дефолтные экшены (actionModuleItemInit)

### Features:
1. ServiceAuth - теперь это класс для удобного и гибкого расширения
1. UniRedux - новая схема работы с редаксом all-in-one и через расширение классов
1. ReduxTable - редакс для таблиц со встроенным selected, meta, filters, changeStatus и редактированием

### Dependencies:

### Commits:
    - bug(redux, table): - добавил возможность сбросить фильтры и мета через подачу null или false
    - bug(auth): - если попытки истекли предлагать залогиниться. Но остается проблема, что после релогина нет повторного запуска неудачных процессов
    - bug(auth): - проксирование обновленного после refresh токена для следующих requests 
        \\ чтобы повторить клиенские запросы упавшие с 401 сделал настройку retryWhenNotAuthErrorTimeout и retryWhenNotAuthErrorAttempts 
        \\ некоторые мидл апи по oauth2.0 возвращают неправильное с маленькой буквы название token_type: 'bearer' сдалал против ник обход
    - bug(auth): - если истек токен, то нужно еще проверить refresh_token, вдруг с помощью него можно залогиниться
    - feat(redux, tables): - дефолтный actions для simple-module-factory
    - chore(changelog): - обновление changelog.md
    - feat(redux, tables): - новый редукс для любых табилц ReduxTable, который можно расширять (либо через override методов, либо через getFeatures()) 
        \\ в ReduxTable есть records, selected, meta, filters, changeStatus и другое 
        \\ обновил simple-module-factory для мапы объектов по uuid
    - bug(ie): - ругался на стрелочные функции
    - bug(auth): - expire в стандарте OAuth2.0 в секундах, а сервер hapi на милисекундах 
        // в новых версиях нет для кук параметра expire, есть ttl
    - bug(auth): - удаление куков в request
    - feat(auth): - Переделал ServiceAuth на класс


## [1.2.0] - 2018-03-01
### !!! Breaking changes:
1. переделал роутинг на опции среди которых можно переопределить классы для некоторых стилизованных компонентов (Notice)
1. переделал authStrategy: теперь вместо (token) она работает от (request, response)

### Dependencies:

### Features:
1. переделал роутинг на мапу опций, среди которых можно переопределить классы компонентов для некоторых стилизованные компонентов 
1. переделал authStrategy теперь она работает от request, response 
1. если сессия протухла, то либо появится сообщение о переходе на логин страницу, либо форма логина (в завизимости от config.common.features.auth.reLoginModalForm) за этим следить AuthErrorContainer 
1. uni-error теперь содержит поле isNoAuth, если слетела авторизация
1. добавил CHANGELOG.md журнал

### Commits:
    - feat(auth): - !!! переделал роутинг на опции среди которых можно переопределить классы для некоторых компонентов // !!! - переделал authStrategy теперь она работает от request, response // если сесси протухла, то либо появится сообщение о переходе на логин страницу, либо форма логина (в завизимости от config.common.features.auth.reLoginModalForm) за этим следить AuthErrorContainer 
        // добавлен новый redux lastUniError (в промисах) 
        // uni-error теперь содержит поле isNoAuth, если слетела авторизаци 
        // в i18n-utils появился метод для биндинга namespace translateWithNamespace 
        // пофиксил багу queryString что не энкодился hash
    - feat(chore): - add CHANGELOG.md

<!--
[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.8...v0.1.0
[0.0.8]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.1...v0.0.2
-->
