'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()

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
            toast.error('Something when wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

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

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 ">
            <hr />
            <Button clasName="hover:bg-gray-700 hover:text-white hover:border-transparent" outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
            <Button clasName="hover:bg-gray-700 hover:text-white hover:border-transparent" outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className="text-neutral-500 text-center mt-1 mb-3 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>
                        Already have an Account?
                    </div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            body={bodyContent}
            disable={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
        />
    );
}

export default RegisterModal;