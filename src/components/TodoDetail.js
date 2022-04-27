import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/modules/modal.module.scss';
import { format } from 'date-fns';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(0);

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setStatus(todo.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus(1);
        }
    }, [type, todo, modalOpen]);
    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className={styles.wrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <motion.div
                        className={styles.container}
                        variants={dropIn}
                        initial='hidden'
                        animate='visible'
                        exit='exit'>
                        <motion.div
                            className={styles.closeButton}
                            onKeyDown={() => setModalOpen(false)}
                            onClick={() => setModalOpen(false)}
                            role='button'
                            tabIndex={0}
                            // animation
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -10, opacity: 1 }}
                            exit={{ top: 40, opacity: 0 }}>
                            <MdOutlineClose />
                        </motion.div>

                        <div className={styles.form}>
                            <h1 className={styles.formTitle}>Todo Detail</h1>
                            <div>
                                <label>Title : {title}</label>
                            </div>
                            <div>
                                <label>Description : {description}</label>
                            </div>
                            <div>
                                <label>Status : {status === 0 ? "Incomplete" : "Completed"}</label>
                            </div>
                            <div>
                                <label>createdAt : {format(new Date(todo.createdAt), 'p, MM/dd/yyyy')}</label>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TodoModal;
