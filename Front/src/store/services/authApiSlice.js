import { apiSlice } from "./apiSlice";

const USER_URL = "/user";

const apiSliceWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["user"],
});

export const authApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: `${USER_URL}/profile`,
          method: "POST",
          body: {},
        };
      },
      providesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `${USER_URL}/profile`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApiSlice;
