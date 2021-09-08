/* eslint-disable react/no-children-prop */
import {
  Box,
  Container,
  Text,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormControl,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { Logo } from 'components/Logo'
import app from 'config/firebase/client'
import { useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail invalido').required('Campo Obrigátorio'),
  username: yup.string().required('Campo Obrigátorio'),
  password: yup.string().required('Campo Obrigátorio')
})

export default function Signup() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async (values) => {
      try {
        const user = await app
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })
  /* 
  const handleSubmit = () => {} */

  return (
    <Container p={4} centerContent>
      <Logo size={290} />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box as="form">
        <FormControl id="email" p={4} isRequired>
          <FormLabel>E-mail </FormLabel>
          <Input
            size="lg"
            type="email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="red.400">{errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha </FormLabel>
          <Input
            size="lg"
            type="password"
            values={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <FormHelperText textColor="red.400">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input
              size="lg"
              type="username"
              values={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.username && (
            <FormHelperText textColor="red.400">
              {errors.username}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button
            width="100%"
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
            colorScheme="blue"
          >
            Entrar
          </Button>
        </Box>
      </Box>
      <Link href="/"> Já possui conta?</Link>
    </Container>
  )
}
