'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterMOdal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(() => {
            registerModal.onClose();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const bodyContent = (
        <div className="flex  flex-col gap-4">
            <Heading 
            title="Welcome To Airbnb" 
            subtitle="Create an account!"
            />
            <Input 
            id="email"
            label="Email"
            disable={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id="name"
            label="Name"
            disable={isLoading}
            register={register}
            errors={errors}
            required
            />
            <Input 
            id="password"
            label="Password"
            type="password"
            disable={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );

    return (
        <Modal 
        body={bodyContent}
        disable={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        />
    );
}

export default RegisterModal;