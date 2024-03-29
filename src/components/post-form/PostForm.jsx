import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE, Loader } from "../index";
import appwriteService from "../../appwrite/appwrite_config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          // userId: userData ? userData.$id : "",
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      let slug = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      if (slug.length > 35) {
        slug = slug.slice(0, 35);
      }

      return slug;
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="font-poppins text-[#1c1d20]"
    >
      <div className="w-full">
        <Input
          label="Title: "
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug: "
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Select
          options={["active", "inactive"]}
          label="Status: "
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4 focus:bg-white border-none pl-1 file:rounded-lg file:font-poppins file:font-semibold duration-200 file:bg-[#1c1d20] file:text-white file:border-none file:py-2 file:px-4 file:hover:bg-[#303134] file:mr-3"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-8">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full mt-8 flex justify-end">
        {loading ? (
          <Button className="w-32">
            <Loader height="h-5" width="w-5" fillColor="fill-white" />
          </Button>
        ) : (
          <Button type="submit" className="w-32">
            {post ? "UPDATE" : "SUBMIT"}
          </Button>
        )}
      </div>
    </form>
  );
}
