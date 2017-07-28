<?php
/**
 * Created by PhpStorm.
 * User: isidoris-simplon
 * Date: 28/07/17
 * Time: 07:53
 */

class User
{
    private $name;
    private $password;
    private $salt;
    private $id;

    /**
     * Player constructor.
     * @param $id
     * @param $name
     * @param $password
     * @param $salt
     */
    public function __construct($name, $password, $salt = null, $id = null)
    {
        $this->id = $id;
        $this->name = $name;
        if ($salt === null) {
            $this->salt = hash("sha256", rand());
            $this->password = hash("sha256", $password.$this->salt);
        } else {
            $this->password = $password;
            $this->salt = $salt;
        }
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return null
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @return null
     */
    public function getId()
    {
        return $this->id;
    }
}