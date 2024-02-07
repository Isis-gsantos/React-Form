import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/style.css'

function MyForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm();
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
    const [loading, setLoading] = useState(false);
    //o useState controla o estado do submitedSuceccessfully e do loading, que no caso estão como false, mas ao usar o set depois que o formulário foi enviado com sucesso no onSubmit eles vão mudar o estado para true, fazendo com que a mensagem e o loading sejam exibidos na tela em vez do formulário

    const onSubmit = data => {
        console.log(data);
        // Define o estado de carregamento como true ao iniciar o envio do formulário
        setLoading(true);

        // Simula uma operação assíncrona, como enviar os dados para um servidor
        setTimeout(() => {
            // Após 2 segundos, define o estado para indicar que o formulário foi enviado com sucesso
            setSubmittedSuccessfully(true);
            // Define o estado de carregamento como false após o envio bem-sucedido do formulário
            setLoading(false);
        }, 1000);
    };

    // Função para obter a classe de erro condicionalmente
    const getErrorClass = fieldName => errors[fieldName] ? 'error' : '';
    //No código que forneci, fieldName é um parâmetro de uma função chamada getErrorClass. Quando você chama essa função passando o nome de um campo como argumento, o valor desse nome é atribuído ao parâmetro fieldName.

    return (
        <div className='container'>
            {submittedSuccessfully ? (
                <div className='success-message'>
                    <h2>Formulário Enviado com Sucesso!</h2>
                    <p>Obrigado por enviar o formulário.</p>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                        {/* Renderiza os inputs independentes e aplica a classe de erro de forma otimizada */}
                        <div className='input flex'>
                            <label htmlFor='name'>Nome</label>
                            <input
                                {...register("firstName", { required: true })}
                                placeholder="First Name"
                                id='name'
                                className={getErrorClass("firstName")}
                            />
                            {errors.firstName && <span className='error-message'>First Name is required</span>}
                        </div>

                        <div className='input flex'>
                            <label htmlFor='sobrenome'>Sobrenome</label>
                            <input
                                {...register("lastName", { required: true })}
                                placeholder="Last Name"
                                id='sobrenome'
                                className={getErrorClass("lastName")}
                            />
                            {errors.lastName && <span className='error-message'>Last Name is required</span>}
                        </div>

                        <div className='input flex'>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                placeholder="Email"
                                id='email'
                                className={getErrorClass("email")}
                            />
                            {errors.email && <span className='error-message'>Invalid email format</span>}
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Submit'}
                        </button>
                    </form>
                    {loading && <p>Carregando...</p>}
                </div>
            )}
        </div>
    );
    //Se submittedSuccessfully for verdadeiro, renderizamos uma mensagem de sucesso, caso contrário, renderizamos o formulário. Essa é uma maneira simples e eficaz de alternar entre a exibição do formulário e a exibição de uma mensagem de sucesso após a submissão.
    //a validação é feita por causa do operador ternário ?, que vai fazer essa verificação como se fosse um if else
}

export default MyForm;