import { NewTzimer } from './interfaces';

export const NewTzimerTypes: Record<keyof NewTzimer, string> = {
    name: 'string',
    description: 'string',
    location: 'string',
    region: 'string',
};
