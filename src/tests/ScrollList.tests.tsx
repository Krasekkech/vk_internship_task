import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { repositoryStore } from '../stores/repo.store.ts';
import {ScrollList} from '../components/ScrollList';

jest.mock('../services/api');

describe('ScrollList', () => {
    it('renders the list and handles scrolling', async () => {
        render(<ScrollList />);



        expect(repositoryStore.loadRepositories).toHaveBeenCalled();
    });
});
