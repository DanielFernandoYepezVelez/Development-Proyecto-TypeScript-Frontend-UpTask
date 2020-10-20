export interface ITask {
    name: string;
    id?: string;
    state?: number;
    project_id?: string;
    created_at?: Date;
}