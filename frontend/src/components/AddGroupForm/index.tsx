import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
  useTheme,
  Theme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useCreateGroupMutation } from '../../services/group-api';
import { createStyles } from '@mui/styles';

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flex: 1,
      mx: 'auto',
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
    },
    link: {
      color: theme.palette.primary.main,
    },
  });

const validation = yup.object({
  name: yup.string().required('Name is required'),
  privacy: yup
    .string()
    .oneOf(['PUBLIC', 'PRIVATE'])
    .required('Privacy is required'),
});

type FormData = typeof validation.__outputType;

export default function AddGroupForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [createGroup] = useCreateGroupMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      privacy: 'PUBLIC',
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createGroup(data).unwrap();
      toast.success('Group created successfully!');
      navigate('/');
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? 'Something went wrong!'
      );
    }
  };

  return (
    <Box
      height='100vh'
      width='100vw'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Card variant='outlined' sx={style.root}>
        <CardContent>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant='h4' component='h1'>
                <b>Signup</b>
              </Typography>
            </Box>
            <TextField
              sx={style.input}
              fullWidth
              type='text'
              placeholder='Name'
              label='Name'
              {...register('name')}
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
            />

            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              fullWidth
              {...register('privacy')}
              sx={style.input}
              label='Privacy'
            >
              <MenuItem value={"PUBLIC"}>PUBLIC</MenuItem>
              <MenuItem value={"PRIVATE"}>PRIVATE</MenuItem>
            </Select>

            <Button
              type='submit'
              sx={style.button}
              variant='contained'
              fullWidth
              disabled={!isValid}
            >
              Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
