import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/action';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';
import TodoDetail from './TodoDetail';

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOppen] = useState(false);

    useEffect(() => {
        if (todo.status === 1) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [todo.status]);

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(updateTodo({ ...todo, status: checked ? 0 : 1 }));
    };

    const handleDelete = () => {
        if(todo.status == 1) {
            toast.error("completed status cannot be deleted")
        } else {
            dispatch(deleteTodo(todo.id));
            toast.success('Todo Deleted Successfully');
        }
    };

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    };

    const handleDetail = () => {
        setDetailModalOppen(true);
    };

    return (
        <>
            <motion.div className={styles.item} variants={child}>
                <div className={styles.todoDetails} onClick={() => handleDetail()}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
                        <p
                            className={getClasses([
                                styles.todoText,
                                todo.status === 1 && styles['todoText--completed'],
                            ])}>
                            {todo.title}
                        </p>
                        <p className={styles.time}>
                            {format(new Date(todo.createdAt), 'p, MM/dd/yyyy')}
                        </p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div
                        className={styles.icon}
                        onClick={() => handleDelete()}
                        onKeyDown={() => handleDelete()}
                        tabIndex={0}
                        role='button'>
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={() => handleUpdate()}
                        onKeyDown={() => handleUpdate()}
                        tabIndex={0}
                        role='button'>
                        <MdEdit />
                    </div>
                </div>
            </motion.div>
            <TodoModal
                type='update'
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
                todo={todo}
            />
            <TodoDetail
                type='update'
                modalOpen={detailModalOpen}
                setModalOpen={setDetailModalOppen}
                todo={todo}
            />
        </>
    );
}

export default TodoItem;
