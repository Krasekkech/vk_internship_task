import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { repositoryStore } from '../stores/repo.store.ts';
import { List, Button, Input } from 'antd';
import styles from '../styles/App.module.css';

export const ScrollList = observer(() => {
    const { repositories, isLoading, loadRepositories, editRepository, deleteRepository } = repositoryStore;

    const [newRepoId, setNewRepoId] = useState<number | null>(null);
    const [newName, setNewName] = useState<string>('')

    useEffect(() => {
        // console.log(newRepoId)
        repositoryStore.loadRepositories().then((r) => {
        });
    }, []);


    const handleEditClick = (id: number, name: string) => {
        setNewRepoId(id);
        setNewName(name);
    };

    const handleSaveClick = () => {
        if (newRepoId) {
            editRepository(newRepoId, { name: newName });
            setNewRepoId(null);
            setNewName('');
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
        if (bottom && !isLoading) {
            repositoryStore.loadRepositories().then((r) => {
            });
        }
    };

    return (
        <div className={styles.container} onScroll={handleScroll}>
            <List
                dataSource={repositories}
                renderItem={(repo) => (
                    <List.Item key={repo.id}>
                        <div className={styles.repoItem}>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            {newRepoId === repo.id ? (
                                    <div>
                                        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Введите новое имя"/>
                                        <Button onClick={handleSaveClick} type="primary">Сохранить</Button>
                                    </div>)
                                : (<div>

                                        <div>
                                            <Button onClick={() => handleEditClick(repo.id, repo.name)}>Редактировать</Button>
                                            <Button onClick={() => deleteRepository(repo.id)} danger>Удалить</Button>
                                        </div>
                                </div>
                                )}
                        </div>
                    </List.Item>
                )}
            />
            {isLoading}
        </div>
    );
});

