# Задание на стажировку вк 2025

Это мой вариант решения задания на бесконечный скролл для отбора на стажировку VK

Данными являются открытые репозитории отсортированные по убыванию количества просмотров, в названии которых содержится слово java

Запрос можно изменить в папке src/services/api.ts

```js
export const fetchRepo = async (page: number) => {
    try {
        const response = await api.get(`search/repositories`, {
            params: { q: 'java', sort: 'watchers', order: 'desc', page }, //подставляете свой пример
        });
        if (response.data && Array.isArray(response.data.items)) {
            return response.data.items;
        } else {
            console.error('Incorrect API response:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
};
```

В проекте также используется Ant Design. Выбрал его, так как до этого не использовал UI фреймворки на практике, а эту библиотеку приводят как пример в тз 


