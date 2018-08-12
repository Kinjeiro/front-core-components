- не устанавливайте semantic-ui-react@0.81.x+
Там есть таска которая заменяет на shallowequals и название файлов одинаковое и поиск
```
chore(package): use shallowequal instead of fbjs and use alias in docs #2940 (layershifter)
```
semantic-ui-react/dist/lib/shallowEquals.js
```
import shallowEqual from 'shallowequal';
```

Вместо ```node_modules/shallowequal/index.js``` ищет этот же файл
и в итоге undefined


