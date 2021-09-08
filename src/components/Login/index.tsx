import {
  Box,
  Container,
  Text,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  FormControl
} from '@chakra-ui/react'
import { Logo } from 'components/Logo'
import app, { persistenceMode } from 'config/firebase/client'
import { useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail invalido').required('Campo Obrigátorio'),
  password: yup.string().required('Campo Obrigátorio')
})

export const Login = () => {
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
      app.auth().setPersistence(persistenceMode)
      try {
        const user = await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch (error) {
        alert(`'servidor ferrou', ${error}`)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: ''
    }
  })

  /*   useEffect(() => {
    console.log('ativa?', app.auth().currentUser)
  }, [])
 */
  return (
    <Container p={4} centerContent>
      <Logo size={290} />
      <Box p={4} mt={8}>
        <Text>Logue na sua Agenda</Text>
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
      <Link href="/signup"> Não possui conta?</Link>
    </Container>
  )
}
