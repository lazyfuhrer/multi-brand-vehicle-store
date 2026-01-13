import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createVehicle } from '../services/api';
import Container from '../components/Container';
import ErrorMessageComponent from '../components/ErrorMessage';
import { VehicleFormValues } from '../types';

const vehicleSchema = Yup.object({
  brand: Yup.string().required('Brand is required'),
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .positive('Price must be a positive number')
    .required('Price is required')
    .typeError('Price must be a number'),
  fuel_type: Yup.string()
    .oneOf(['Petrol', 'Diesel', 'Electric'], 'Fuel type must be Petrol, Diesel, or Electric')
    .required('Fuel type is required'),
  image_url: Yup.string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  admin_token: Yup.string()
    .required('Admin token is required')
    .min(1, 'Admin token cannot be empty'),
});

const AdminAddVehicle = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleSubmit = async (
    values: VehicleFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ): Promise<void> => {
    try {
      setSubmitError(null);
      setSubmitSuccess(false);
      
      // Extract admin_token and vehicle data
      const { admin_token, ...vehicleFormData } = values;
      
      // Convert price string to number
      const vehicleData = {
        ...vehicleFormData,
        price: parseInt(vehicleFormData.price, 10),
      };
      
      if (!admin_token) {
        setSubmitError('Admin token is required');
        setSubmitting(false);
        return;
      }
      
      await createVehicle(vehicleData, admin_token);
      
      setSubmitSuccess(true);
      resetForm();
      
      // Redirect to vehicles list after 2 seconds
      setTimeout(() => {
        navigate('/vehicles');
      }, 2000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { detail?: string; message?: string } } };
        const errorMessage = axiosError.response?.data?.detail || 
                           axiosError.response?.data?.message || 
                           'Failed to create vehicle. Please check your admin token.';
        setSubmitError(errorMessage);
      } else {
        setSubmitError('Failed to create vehicle. Please check your admin token.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add New Vehicle</h1>
        <p className="text-sm sm:text-base text-gray-600">Admin only - Add a new vehicle to the store</p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-turno-success-light border border-turno-success rounded-md">
          <p className="text-turno-primary-dark font-medium">
            Vehicle created successfully! Redirecting to vehicles list...
          </p>
        </div>
      )}

      {submitError && (
        <div className="mb-6">
          <ErrorMessageComponent
            message={submitError}
            onRetry={() => setSubmitError(null)}
          />
        </div>
      )}

      <div className="bg-turno-card-bg rounded-lg shadow-md p-4 sm:p-6 lg:p-8 border border-turno-primary-light">
        <Formik
          initialValues={{
            brand: '',
            name: '',
            price: '',
            fuel_type: '',
            image_url: '',
            description: '',
            admin_token: '',
          }}
          validationSchema={vehicleSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Brand Field */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Brand *
                  </label>
                  <Field
                    type="text"
                    id="brand"
                    name="brand"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.brand && touched.brand
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="e.g., Toyota"
                  />
                  <FormikErrorMessage
                    name="brand"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name *
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.name && touched.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="e.g., Camry"
                  />
                  <FormikErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Price Field */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price *
                  </label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.price && touched.price
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="e.g., 25000 (in INR)"
                    min="0"
                    step="1"
                  />
                  <FormikErrorMessage
                    name="price"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Fuel Type Field */}
                <div>
                  <label
                    htmlFor="fuel_type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Fuel Type *
                  </label>
                  <Field
                    as="select"
                    id="fuel_type"
                    name="fuel_type"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.fuel_type && touched.fuel_type
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                  >
                    <option value="">Select fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </Field>
                  <FormikErrorMessage
                    name="fuel_type"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Image URL Field */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="image_url"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Image URL *
                  </label>
                  <Field
                    type="url"
                    id="image_url"
                    name="image_url"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.image_url && touched.image_url
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FormikErrorMessage
                    name="image_url"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Description Field */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.description && touched.description
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="Enter a detailed description (minimum 10 characters)"
                  />
                  <FormikErrorMessage
                    name="description"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Admin Token Field */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="admin_token"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Admin Secret Key *
                  </label>
                  <Field
                    type="password"
                    id="admin_token"
                    name="admin_token"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.admin_token && touched.admin_token
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-turno-primary focus:border-turno-primary'
                    }`}
                    placeholder="Enter your admin secret key"
                  />
                  <FormikErrorMessage
                    name="admin_token"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the admin secret key to authorize vehicle creation.
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-turno-primary text-white rounded-md text-sm sm:text-base font-medium hover:bg-turno-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Vehicle'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/vehicles')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-200 text-gray-700 rounded-md text-sm sm:text-base font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default AdminAddVehicle;
