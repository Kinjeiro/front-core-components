/* eslint-disable max-len */
module.exports = {
  pages: {
    AppLayout: {
      title: 'Компоненты FrontCore',
      menu: {
        login: 'Войти',
        logout: 'Выйти',
      },

      Header: {
        title: 'Компоненты FrontCore',
        description: '',
      },
    },
  },

  components: {
    Loading: {
      loadingText: 'Загрузка...',
    },
    Modal: {
      textOk: 'Хорошо',
      textCancel: 'Отменить',
    },
    Sidebar: {
      logout: 'Выйти',
    },
    Attachment: {
      dropThere: 'Перетащите сюда файлы',
      addButton: 'Добавить файл',
    },
    KeyValueList: {
      drag: 'перетащите характеристику из списка сюда',
      orCreate: 'или создайте',
      inputName: {
        placeholder: 'Признак',
      },
      inputValue: {
        placeholder: 'Значение',
      },
      actionAdd: 'Добавить',
    },
    ToggledAddData: {
      showDataAction: 'Добавить',
      onProceedAction: 'Отправить',
    },
    Tabs: {
      textOr: 'или',
    },
    UniTable: {
      textNoData: 'Нет доступных элементов',
      textYouSelectedPage: 'Выбраны все элементы на странице',
      textActionSelectAll: 'Выбрать на всех страницах',
      textYouSelectedAll: 'Выбраны все элементы',
    },
    ErrorBoundary: {
      errorOccurred: 'Произошла ошибка',
      refreshButton: 'Обновить',
    },
  },
};
