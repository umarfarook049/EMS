PGDMP  4    4                |            emps    16.3    16.3 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    emps    DATABASE     w   CREATE DATABASE emps WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE emps;
                postgres    false            �            1259    16464    finance_details    TABLE     8  CREATE TABLE public.finance_details (
    employee_id integer,
    user_id integer,
    pancard character(10) NOT NULL,
    aadharcard character(12) NOT NULL,
    bank_name character varying(255) NOT NULL,
    branch character varying(255) NOT NULL,
    ifsc_code character(11) NOT NULL,
    ctc_breakup text
);
 #   DROP TABLE public.finance_details;
       public         heap    postgres    false            �            1259    16414    personal_details    TABLE     #  CREATE TABLE public.personal_details (
    employee_id integer NOT NULL,
    user_id integer,
    full_name character varying(255) NOT NULL,
    date_of_birth date NOT NULL,
    gender character varying(50) NOT NULL,
    age integer,
    current_address character varying(255) NOT NULL,
    permanent_address character varying(255) NOT NULL,
    mobile character(10) NOT NULL,
    personal_mail character varying(255) NOT NULL,
    emergency_contact_name character varying(255) NOT NULL,
    emergency_contact_mobile character(10) NOT NULL,
    CONSTRAINT personal_details_age_check CHECK (((age >= 0) AND (age <= 999))),
    CONSTRAINT personal_details_gender_check CHECK (((gender)::text = ANY ((ARRAY['Male'::character varying, 'Female'::character varying, 'Other'::character varying])::text[])))
);
 $   DROP TABLE public.personal_details;
       public         heap    postgres    false            �            1259    16413     personal_details_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_details_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.personal_details_employee_id_seq;
       public          postgres    false    218                       0    0     personal_details_employee_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.personal_details_employee_id_seq OWNED BY public.personal_details.employee_id;
          public          postgres    false    217            �            1259    16432    professional_details    TABLE     �  CREATE TABLE public.professional_details (
    employee_id integer,
    user_id integer,
    company_mail character varying(255) NOT NULL,
    office_phone character(12),
    city character varying(255) NOT NULL,
    office_address character varying(255) NOT NULL,
    reporting_manager character varying(255),
    hr_name character varying(255),
    employment_history text,
    date_of_joining date NOT NULL
);
 (   DROP TABLE public.professional_details;
       public         heap    postgres    false            �            1259    16449    project_details    TABLE       CREATE TABLE public.project_details (
    employee_id integer,
    user_id integer,
    project_code character varying(50) NOT NULL,
    start_date date NOT NULL,
    end_date date,
    client_name character varying(255),
    reporting_manager character varying(255)
);
 #   DROP TABLE public.project_details;
       public         heap    postgres    false            �            1259    16400    users    TABLE     I  CREATE TABLE public.users (
    user_id integer NOT NULL,
    employee_code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    active boolean DEFAULT true NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16399    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    216                       0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            d           2604    16417    personal_details employee_id    DEFAULT     �   ALTER TABLE ONLY public.personal_details ALTER COLUMN employee_id SET DEFAULT nextval('public.personal_details_employee_id_seq'::regclass);
 K   ALTER TABLE public.personal_details ALTER COLUMN employee_id DROP DEFAULT;
       public          postgres    false    218    217    218            a           2604    16403    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    16464    finance_details 
   TABLE DATA              COPY public.finance_details (employee_id, user_id, pancard, aadharcard, bank_name, branch, ifsc_code, ctc_breakup) FROM stdin;
    public          postgres    false    221   �5                 0    16414    personal_details 
   TABLE DATA           �   COPY public.personal_details (employee_id, user_id, full_name, date_of_birth, gender, age, current_address, permanent_address, mobile, personal_mail, emergency_contact_name, emergency_contact_mobile) FROM stdin;
    public          postgres    false    218   ?7                 0    16432    professional_details 
   TABLE DATA           �   COPY public.professional_details (employee_id, user_id, company_mail, office_phone, city, office_address, reporting_manager, hr_name, employment_history, date_of_joining) FROM stdin;
    public          postgres    false    219   Q9                 0    16449    project_details 
   TABLE DATA           �   COPY public.project_details (employee_id, user_id, project_code, start_date, end_date, client_name, reporting_manager) FROM stdin;
    public          postgres    false    220   �:                 0    16400    users 
   TABLE DATA           `   COPY public.users (user_id, employee_code, name, email, password, is_admin, active) FROM stdin;
    public          postgres    false    216   k;                  0    0     personal_details_employee_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.personal_details_employee_id_seq', 14, true);
          public          postgres    false    217                       0    0    users_user_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.users_user_id_seq', 122, true);
          public          postgres    false    215            t           2606    16472 .   finance_details finance_details_aadharcard_key 
   CONSTRAINT     o   ALTER TABLE ONLY public.finance_details
    ADD CONSTRAINT finance_details_aadharcard_key UNIQUE (aadharcard);
 X   ALTER TABLE ONLY public.finance_details DROP CONSTRAINT finance_details_aadharcard_key;
       public            postgres    false    221            v           2606    16470 +   finance_details finance_details_pancard_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.finance_details
    ADD CONSTRAINT finance_details_pancard_key UNIQUE (pancard);
 U   ALTER TABLE ONLY public.finance_details DROP CONSTRAINT finance_details_pancard_key;
       public            postgres    false    221            n           2606    16425 3   personal_details personal_details_personal_mail_key 
   CONSTRAINT     w   ALTER TABLE ONLY public.personal_details
    ADD CONSTRAINT personal_details_personal_mail_key UNIQUE (personal_mail);
 ]   ALTER TABLE ONLY public.personal_details DROP CONSTRAINT personal_details_personal_mail_key;
       public            postgres    false    218            p           2606    16423 &   personal_details personal_details_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.personal_details
    ADD CONSTRAINT personal_details_pkey PRIMARY KEY (employee_id);
 P   ALTER TABLE ONLY public.personal_details DROP CONSTRAINT personal_details_pkey;
       public            postgres    false    218            r           2606    16438 :   professional_details professional_details_company_mail_key 
   CONSTRAINT     }   ALTER TABLE ONLY public.professional_details
    ADD CONSTRAINT professional_details_company_mail_key UNIQUE (company_mail);
 d   ALTER TABLE ONLY public.professional_details DROP CONSTRAINT professional_details_company_mail_key;
       public            postgres    false    219            h           2606    16412    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            j           2606    16410    users users_employee_code_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_code_key UNIQUE (employee_code);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT users_employee_code_key;
       public            postgres    false    216            l           2606    16408    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            |           2606    16473 0   finance_details finance_details_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.finance_details
    ADD CONSTRAINT finance_details_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.personal_details(employee_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.finance_details DROP CONSTRAINT finance_details_employee_id_fkey;
       public          postgres    false    221    218    4720            }           2606    16478 ,   finance_details finance_details_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.finance_details
    ADD CONSTRAINT finance_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.finance_details DROP CONSTRAINT finance_details_user_id_fkey;
       public          postgres    false    4716    221    216            w           2606    16426 .   personal_details personal_details_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personal_details
    ADD CONSTRAINT personal_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.personal_details DROP CONSTRAINT personal_details_user_id_fkey;
       public          postgres    false    216    218    4716            x           2606    16439 :   professional_details professional_details_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.professional_details
    ADD CONSTRAINT professional_details_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.personal_details(employee_id) ON DELETE CASCADE;
 d   ALTER TABLE ONLY public.professional_details DROP CONSTRAINT professional_details_employee_id_fkey;
       public          postgres    false    219    218    4720            y           2606    16444 6   professional_details professional_details_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.professional_details
    ADD CONSTRAINT professional_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.professional_details DROP CONSTRAINT professional_details_user_id_fkey;
       public          postgres    false    219    216    4716            z           2606    16454 0   project_details project_details_employee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.personal_details(employee_id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.project_details DROP CONSTRAINT project_details_employee_id_fkey;
       public          postgres    false    4720    220    218            {           2606    16459 ,   project_details project_details_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.project_details
    ADD CONSTRAINT project_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.project_details DROP CONSTRAINT project_details_user_id_fkey;
       public          postgres    false    216    4716    220               N  x���=N�0���)|����&rZj�:!u�Z%H-��,��8%A�����}�~�W�LOrB/ ����7OHm��t;���Y?BY8�1&!ЕF��W������p1ZYTm7T�\�	'����T��L��.Pi'�B0�g��\- 1�Ȁc�Fl�5U�@N����\���;�BQ�O���`�M��Ĳ�*{��@�ӟ�k�#j$��$���h�~T��0ƌJw�3��V�S���M?_��Ӫݼ���k�@x.�L2y�K�$q"R)�e%X�l���+0�Ɵ��v�.�[""��}N��!d0���O�VQ}s���           x���ێ�0��'O��"���wX�U�@TmUT�q����r��O�N�h�T+����f~T����,MX
�X�� �^n��_�q_H�9�m������ތև��)6&_��χ���
�>�%�a�X.�3�A4��KP���yP�d��8v���&�����0PO����6:
�0��KH_��Þ�p���I�S<��=���ϢI���<����I�8E�r���4O����>֥����Fg�đ� ?/�T��3����]yV�O8��AY�o:ׅ�Ӧi��h���0�N��B5�MP"���=�sLw���AV�@��4���%hP�C]Z�� �1B$��ʔ۟:�����Q�ׄ�e������;U�:>�H��o;�$ia��\�e�V[�n���J�[p[KvP�����Jͯ_I�����m�w�ܰZ۠s�nlj�"P��}T+��k�כ�4�]��ֹ�1�'7�yr�{wt�~$�\x�g���h�݋on:�G��P'u         i  x���Oo�0 ���S���_����4qq��/�!J
Kd�~�u��H�+�����50��EV���.��L� ʸ�jF3B �a�5-`3�??�$;حa���ÖG�fuc]K�K7,q675pJ�2��%�.���#gR1�'O�m�y�7�,��|�|�rqe#
��؝)#s��1�g�y�ߢ���!3��=*�{E�P�2z�TxTޡ]~F候2աң�1Sz�T�����U�>��������	��Ka�_�x(�?����R�t�g�Ju��d�8c��	���Ǖ��P�Vg{X���)0��M�9U�e��9�5W~���ypHt��ͶR(!�R3����8o��q�A�`M         �   x���=
�@�z��@d�b�2H�nE��yO�Lh#�x��f�"0��H(���m�W����b1ǡ��NbG�4v쮉��[�Nݵ�k�����!	���,�F�K� ��q<U}"5�k����V�ǖUJ�nI^         8  x�]�A��0��Ï1����&b@��Xq�f/�R�j(�q�RP�{��u���\�mہxͶP�8aq�e����9���x�!α�:�J˵1�(`+Q���*��ߊ�2~b�3��fĠ�JҪJ��Hm{<?c�$y[�QjP�6^�]TTX����t�]���`��a� �.3�ݩ7̵��r��p�y��6� B�?��T5-��/��İx���.hf�I"�$]�\�)����O��E�'{��!d�:�BBԘk�M��(�sj8�YY�FŌ�1��lC�V��������}�/;�s�,���:�R     