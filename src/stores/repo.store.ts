import {makeAutoObservable, runInAction} from 'mobx';
import { fetchRepo } from '../services/api';

interface Repository {
    id: number;
    name: string;
    description: string;
    stars: number;
}

export class RepositoryStore {
    repositories: Repository[] = [];
    isLoading = false;
    page = 1;

    constructor() {
        makeAutoObservable(this);
    }

    async loadRepositories() {
        runInAction(() => {
            this.isLoading = true;
        })
        try {
            const newRepositories = await fetchRepo(this.page);
            if (newRepositories.length > 0) {
                runInAction(() => {
                    this.repositories = [...this.repositories, ...newRepositories];
                    this.page += 1;
                })
            } else {
                console.warn('No repositories.');
            }
        } catch (error) {
            console.error('Error loading repositories:', error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })

        }
    }

    editRepository = (id: number, updatedData: Partial<Repository>) => {
        this.repositories = this.repositories.map((repo) =>
            repo.id === id ? { ...repo, ...updatedData } : repo
        );
    };

    deleteRepository = (id: number) => {
        this.repositories = this.repositories.filter((repo) => repo.id !== id);
    };
}

export const repositoryStore = new RepositoryStore();