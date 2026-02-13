import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export default function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}) {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-dark text-white hover:bg-dark-lighter',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
                'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors duration-200',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
