//
// Copyright (c) 2017 Resonate Group Ltd.  All Rights Reserved.
//

package com.blake.railway.passenger.departureboard.util;

import java.io.File;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * JSON Utilities
 */
public final class JsonUtils
{
    private static final ObjectMapper OBJECT_MAPPER;

    static
    {
        OBJECT_MAPPER = new ObjectMapper();
        OBJECT_MAPPER.findAndRegisterModules();
        OBJECT_MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        OBJECT_MAPPER.enable(SerializationFeature.INDENT_OUTPUT);
    }

    private JsonUtils()
    {

    }

    /**
     * Serialise the given object.
     * @param objectMapper
     *          the ObjectMapper to use to serialise objectToMap
     * @param objectToMap
     *            the object to map
     * @return serialised JSON as a String
     * @throws JsonProcessingException
     *             if the object could not be serialised
     */
    public static <T> String serialise(final ObjectMapper objectMapper, final T objectToMap) throws JsonProcessingException
    {
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(objectToMap);
    }

    /**
     * Serialise the given object
     * @param objectToMap
     * @param <T>
     * @return
     * @throws JsonProcessingException
     */
    public static <T> String serialise(final T objectToMap)
    {
        String result = "";
        try
        {
            result = OBJECT_MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(objectToMap);
        }
        catch (JsonProcessingException e)
        {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * Serialise the given object unconditionally, returns empty json object if any exception occurs.
     * @param objectMapper
     *          the ObjectMapper to use to serialise objectToMap
     * @param objectToMap
     *            the object to map
     * @return serialised JSON as a String
     * @throws JsonProcessingException
     *             if the object could not be serialised
     */
    public static <T> String serialiseQuietly(final ObjectMapper objectMapper, final T objectToMap)
    {
        try
        {
            return serialise(objectMapper, objectToMap);
        }
        catch (JsonProcessingException e)
        {
            return "{}";
        }
    }

    /**
     * Deserialise the given String to the given class type.
     * @param objectMapper
     *          the ObjectMapper to use to deserialise serialised
     * @param clazz
     *            the expected object type
     * @param serialised
     *            the serialised data
     * @return the deserialised object
     * @throws IOException
     *             if the object could not be deserialised
     */
    public static <T> T deserialise(final ObjectMapper objectMapper, final Class<T> clazz, final String serialised)
        throws IOException
    {
        return objectMapper.readValue(serialised, clazz);
    }

    /**
     * Deserialise the given String to the given class type.
     * @param clazz
     * @param serialised
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T deserialise(final Class<T> clazz, final String serialised) throws IOException
    {
        return OBJECT_MAPPER.readValue(serialised, clazz);
    }

    /**
     * Deserialise the given String to the given type reference.
     * @param typeReference
     * @param serialised
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T deserialise(final TypeReference<T> typeReference, final String serialised) throws IOException
    {
        return OBJECT_MAPPER.readValue(serialised, typeReference);
    }

    /**
     * Deserialise the given File to the given class type.
     * @param clazz
     * @param file
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T deserialise(final Class<T> clazz, final File file)
    {
        T result = null;
        try
        {
            result = OBJECT_MAPPER.readValue(file, clazz);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return result;
    }

    public static ObjectMapper getObjectMapper()
    {
        return OBJECT_MAPPER;
    }

}

